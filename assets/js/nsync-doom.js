(function () {
    "use strict";

    const root = document.getElementById("nsync-doom-demo");
    if (!root) return;

    const canvas = root.querySelector("#nsync-doom-canvas");
    const ctx = canvas.getContext("2d");
    const overlay = root.querySelector("[data-nsync-overlay]");
    const startButton = root.querySelector("[data-nsync-start]");
    const hud = {
        health: root.querySelector("[data-nsync-health]"),
        glitter: root.querySelector("[data-nsync-glitter]"),
        score: root.querySelector("[data-nsync-score]"),
        status: root.querySelector("[data-nsync-status]")
    };

    const world = [
        "############",
        "#..........#",
        "#..##..#...#",
        "#......#...#",
        "#.##.......#",
        "#....###...#",
        "#..........#",
        "#...#..##..#",
        "#...#......#",
        "#......##..#",
        "#..........#",
        "############"
    ];

    const TAU = Math.PI * 2;
    const FOV = Math.PI / 3;
    const keys = Object.create(null);
    const virtual = Object.create(null);
    const particles = [];
    const pickups = [
        { x: 1.8, y: 8.3, label: "poster", taken: false },
        { x: 7.5, y: 1.8, label: "pass", taken: false },
        { x: 9.7, y: 9.4, label: "cd", taken: false }
    ];

    let dpr = 1;
    let viewW = 640;
    let viewH = 360;
    let raf = 0;
    let lastTime = 0;
    let running = false;
    let gameEnded = false;
    let messageTimer = 0;
    let typed = "";
    let audioContext = null;
    let bossSpawned = false;

    const player = {
        x: 2.4,
        y: 2.2,
        angle: 0.15,
        health: 100,
        glitter: 40,
        score: 0,
        dance: 0
    };

    let enemies = [];

    function resetGame() {
        player.x = 2.4;
        player.y = 2.2;
        player.angle = 0.15;
        player.health = 100;
        player.glitter = 40;
        player.score = 0;
        player.dance = 0;
        gameEnded = false;
        bossSpawned = false;
        messageTimer = 2.4;
        pickups.forEach((pickup) => {
            pickup.taken = false;
        });
        enemies = [
            enemy(8.7, 2.3, "fashion"),
            enemy(4.4, 4.8, "bug"),
            enemy(9.2, 5.3, "rival"),
            enemy(2.3, 7.7, "bug"),
            enemy(5.8, 9.2, "fashion"),
            enemy(10.0, 7.9, "rival")
        ];
        setStatus("OMG bestie! Grab sparkle boosts & clear the mall! Pop Punk Demon is hiding like a scared boy band! ✨");
        updateHud();
    }

    function enemy(x, y, type) {
        const boss = type === "boss";
        return {
            x,
            y,
            type,
            hp: boss ? 8 : 2,
            maxHp: boss ? 8 : 2,
            speed: boss ? 0.55 : 0.82,
            cooldown: 0.8 + Math.random(),
            hurt: 0
        };
    }

    function resizeCanvas() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        viewW = Math.max(320, Math.floor(rect.width || 640));
        viewH = Math.max(180, Math.floor(rect.height || viewW * 0.5625));
        canvas.width = Math.floor(viewW * dpr);
        canvas.height = Math.floor(viewH * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        render();
    }

    function isWall(x, y) {
        const mx = Math.floor(x);
        const my = Math.floor(y);
        if (my < 0 || my >= world.length || mx < 0 || mx >= world[0].length) return true;
        return world[my][mx] === "#";
    }

    function canStand(x, y) {
        const r = 0.18;
        return !isWall(x - r, y - r) && !isWall(x + r, y - r) && !isWall(x - r, y + r) && !isWall(x + r, y + r);
    }

    function normalizeAngle(angle) {
        while (angle < -Math.PI) angle += TAU;
        while (angle > Math.PI) angle -= TAU;
        return angle;
    }

    function castRay(angle, maxDistance) {
        const step = 0.035;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        let distance = 0;
        while (distance < maxDistance) {
            distance += step;
            const x = player.x + cos * distance;
            const y = player.y + sin * distance;
            if (isWall(x, y)) {
                return {
                    distance,
                    hitX: x,
                    hitY: y
                };
            }
        }
        return { distance: maxDistance, hitX: player.x + cos * maxDistance, hitY: player.y + sin * maxDistance };
    }

    function hasLineOfSight(x, y) {
        const angle = Math.atan2(y - player.y, x - player.x);
        const maxDistance = Math.hypot(x - player.x, y - player.y);
        return castRay(angle, maxDistance).distance + 0.08 >= maxDistance;
    }

    function movePlayer(dx, dy) {
        const nextX = player.x + dx;
        const nextY = player.y + dy;
        if (canStand(nextX, player.y)) player.x = nextX;
        if (canStand(player.x, nextY)) player.y = nextY;
    }

    function update(dt) {
        if (!running || gameEnded) return;

        const forward = (keys.KeyW || keys.ArrowUp || virtual.forward ? 1 : 0) - (keys.KeyS || keys.ArrowDown || virtual.back ? 1 : 0);
        const strafe = (keys.KeyD || virtual.right ? 1 : 0) - (keys.KeyA || virtual.left ? 1 : 0);
        const turn = (keys.ArrowRight || keys.KeyE || virtual.turnRight ? 1 : 0) - (keys.ArrowLeft || keys.KeyQ || virtual.turnLeft ? 1 : 0);
        player.angle = normalizeAngle(player.angle + turn * dt * 2.45);

        const speed = 2.15 * dt;
        if (forward) {
            movePlayer(Math.cos(player.angle) * speed * forward, Math.sin(player.angle) * speed * forward);
        }
        if (strafe) {
            movePlayer(Math.cos(player.angle + Math.PI / 2) * speed * strafe, Math.sin(player.angle + Math.PI / 2) * speed * strafe);
        }

        pickups.forEach((pickup) => {
            if (!pickup.taken && Math.hypot(pickup.x - player.x, pickup.y - player.y) < 0.55) {
                pickup.taken = true;
                player.glitter = Math.min(99, player.glitter + 18);
                player.score += 150;
                player.dance = 0.7;
                setStatus("YAAAS bestie! " + pickup.label.toUpperCase() + " sparkle boost unlocked! *twirls* 💖");
                beep(680, 0.07, "triangle", 0.05);
                beep(980, 0.08, "triangle", 0.04, 0.05);
                maybeSpawnBoss();
            }
        });

        enemies.forEach((foe) => {
            foe.hurt = Math.max(0, foe.hurt - dt);
            foe.cooldown -= dt;
            const dx = player.x - foe.x;
            const dy = player.y - foe.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 7 && hasLineOfSight(foe.x, foe.y)) {
                if (dist > 0.8) {
                    const vx = (dx / dist) * foe.speed * dt;
                    const vy = (dy / dist) * foe.speed * dt;
                    if (!isWall(foe.x + vx * 2.2, foe.y)) foe.x += vx;
                    if (!isWall(foe.x, foe.y + vy * 2.2)) foe.y += vy;
                } else if (foe.cooldown <= 0) {
                    const damage = foe.type === "boss" ? 16 : 8;
                    player.health = Math.max(0, player.health - damage);
                    foe.cooldown = foe.type === "boss" ? 1.1 : 1.35;
                    shake(foe.type === "boss" ? 18 : 10);
                    setStatus(foe.type === "boss" ? "OMG! Pop Punk Demon hit you with eyeliner angst! *clutches pearls* 😱" : "EW! Rival CD incoming! *dodges* ✨");
                    beep(110, 0.12, "sawtooth", 0.05);
                    if (player.health <= 0) endGame(false);
                }
            }
        });

        for (let i = enemies.length - 1; i >= 0; i -= 1) {
            if (enemies[i].hp <= 0) {
                const defeated = enemies.splice(i, 1)[0];
                player.score += defeated.type === "boss" ? 2000 : 300;
                player.glitter = Math.min(99, player.glitter + (defeated.type === "boss" ? 12 : 5));
                spawnBurst(defeated.x, defeated.y, defeated.type === "boss" ? 34 : 16);
                setStatus(defeated.type === "boss" ? "The arena is yours. Virtual meet-and-greet unlocked!" : "Bye bye bye, fashion crime.");
                if (defeated.type === "boss") endGame(true);
            }
        }

        maybeSpawnBoss();

        for (let i = particles.length - 1; i >= 0; i -= 1) {
            const p = particles[i];
            p.life -= dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            if (p.life <= 0) particles.splice(i, 1);
        }

        player.dance = Math.max(0, player.dance - dt);
        messageTimer = Math.max(0, messageTimer - dt);
        updateHud();
    }

    function maybeSpawnBoss() {
        if (bossSpawned || gameEnded) return;
        const boostsCollected = pickups.filter((pickup) => pickup.taken).length;
        const regularEnemiesLeft = enemies.filter((foe) => foe.type !== "boss").length;
        if (boostsCollected < 2 && regularEnemiesLeft > 0) return;

        bossSpawned = true;
        const spawn = chooseBossSpawn();
        enemies.push(enemy(spawn.x, spawn.y, "boss"));
        spawnBurst(spawn.x, spawn.y, 28);
        setStatus("OMG bestie! The Pop Punk Demon just CRASHED the mall! *gasp* Check the backstage! 😱");
        shake(14);
        beep(150, 0.12, "sawtooth", 0.05);
        beep(80, 0.18, "sawtooth", 0.04, 0.09);
    }

    function chooseBossSpawn() {
        const candidates = [
            { x: 9.9, y: 1.7 },
            { x: 10.1, y: 9.8 },
            { x: 1.7, y: 10.1 },
            { x: 7.9, y: 6.5 },
            { x: 5.2, y: 8.7 }
        ].filter((candidate) => canStand(candidate.x, candidate.y));
        const hiddenCandidates = candidates.filter((candidate) => {
            const distance = Math.hypot(candidate.x - player.x, candidate.y - player.y);
            return distance > 5.2 && !hasLineOfSight(candidate.x, candidate.y);
        });
        const pool = hiddenCandidates.length ? hiddenCandidates : candidates;
        return pool.reduce((best, candidate) => {
            const bestDistance = Math.hypot(best.x - player.x, best.y - player.y);
            const distance = Math.hypot(candidate.x - player.x, candidate.y - player.y);
            return distance > bestDistance ? candidate : best;
        }, pool[0]);
    }

    function shoot() {
        if (!running || gameEnded) return;
        canvas.focus();
        if (player.glitter <= 0) {
            setStatus("Out of glitter. Grab a pass or poster!");
            beep(90, 0.08, "square", 0.04);
            return;
        }

        player.glitter -= 1;
        player.dance = 0.16;
        beep(440, 0.045, "square", 0.045);
        beep(660, 0.045, "square", 0.035, 0.035);
        shake(6);

        let target = null;
        let targetAngle = 0;
        let best = Infinity;
        enemies.forEach((foe) => {
            const dx = foe.x - player.x;
            const dy = foe.y - player.y;
            const dist = Math.hypot(dx, dy);
            const angle = normalizeAngle(Math.atan2(dy, dx) - player.angle);
            const tolerance = foe.type === "boss" ? 0.2 : 0.14;
            if (Math.abs(angle) < tolerance && dist < best && hasLineOfSight(foe.x, foe.y)) {
                target = foe;
                targetAngle = angle;
                best = dist;
            }
        });

        if (target) {
            target.hp -= 1;
            target.hurt = 0.16;
            spawnBurst(target.x, target.y, 8);
            setStatus(target.type === "boss" ? "YAAAS! Glitter bomb EXPLODED on the Pop Punk Demon! *happy dance* 💥" : "Bye bye bye, fashion crime! *snap* 💅");
        } else {
            const ray = castRay(player.angle, 8);
            spawnBurst(ray.hitX, ray.hitY, 5);
            setStatus(Math.abs(targetAngle) > 0.16 ? "Sparkles EVERYWHERE! *throws glitter* ✨" : "Missed... but still FABULOUS! *adjusts headband* 💅");
        }
    }

    let shakeFrames = 0;
    function shake(amount) {
        shakeFrames = Math.max(shakeFrames, amount);
    }

    function spawnBurst(x, y, count) {
        for (let i = 0; i < count; i += 1) {
            const angle = Math.random() * TAU;
            const speed = 0.35 + Math.random() * 1.1;
            particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0.28 + Math.random() * 0.42,
                color: Math.random() > 0.5 ? "#ff00ff" : "#00ffff"
            });
        }
    }

    function endGame(won) {
        gameEnded = true;
        running = false;
        overlay.hidden = false;
        startButton.textContent = won ? "Play Again" : "Restart";
        const heading = overlay.querySelector("h3");
        const copy = overlay.querySelector("p");
        heading.textContent = won ? "*NSYNC Doom Demo CLEARED! *twirls* 🎉" : "Game Over *wipes glitter tear* 😭";
        copy.textContent = won
            ? "YAAAS bestie! You DESTROYED the Pop Punk Demon! Virtual *NSYNC meet-and-greet UNLOCKED! *screams* 💖✨"
            : "Aww bestie... Bicky got overwhelmed. *reloads glitter* Try again! *blows kiss* 💋";
        setStatus(won ? "VICTORY! *NSYNC meet-and-greet UNLOCKED! *happy dance* 💃" : "Game over bestie... *sniffs* Hit restart! 😢");
        beep(won ? 880 : 130, 0.14, won ? "triangle" : "sawtooth", 0.06);
        updateHud();
    }

    function setStatus(text) {
        hud.status.textContent = text;
    }

    function updateHud() {
        hud.health.textContent = String(Math.ceil(player.health));
        hud.glitter.textContent = String(Math.ceil(player.glitter));
        hud.score.textContent = String(player.score);
    }

    function render() {
        ctx.save();
        if (shakeFrames > 0) {
            ctx.translate((Math.random() - 0.5) * shakeFrames * 0.45, (Math.random() - 0.5) * shakeFrames * 0.3);
            shakeFrames *= 0.72;
            if (shakeFrames < 0.5) shakeFrames = 0;
        }

        drawWorld();
        drawSprites();
        drawParticles();
        drawWeapon();
        drawMiniMap();
        if (!running && !gameEnded) drawBootText();
        ctx.restore();
    }

    function drawWorld() {
        const sky = ctx.createLinearGradient(0, 0, 0, viewH * 0.52);
        sky.addColorStop(0, "#26003b");
        sky.addColorStop(0.55, "#08010d");
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, viewW, viewH * 0.52);

        const floor = ctx.createLinearGradient(0, viewH * 0.5, 0, viewH);
        floor.addColorStop(0, "#170019");
        floor.addColorStop(1, "#3b0048");
        ctx.fillStyle = floor;
        ctx.fillRect(0, viewH * 0.5, viewW, viewH * 0.5);

        ctx.strokeStyle = "rgba(0, 255, 255, 0.18)";
        ctx.lineWidth = 1;
        for (let y = viewH * 0.56; y < viewH; y += 16) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(viewW, y + (y - viewH * 0.55) * 0.14);
            ctx.stroke();
        }

        const rayCount = Math.max(120, Math.floor(viewW / 4));
        const strip = viewW / rayCount;
        const depths = [];
        for (let i = 0; i < rayCount; i += 1) {
            const rayAngle = player.angle - FOV / 2 + (i / (rayCount - 1)) * FOV;
            const hit = castRay(rayAngle, 12);
            const corrected = Math.max(0.08, hit.distance * Math.cos(rayAngle - player.angle));
            depths[i] = corrected;
            const wallHeight = Math.min(viewH * 1.5, viewH / corrected * 0.86);
            const top = viewH * 0.52 - wallHeight / 2;
            const shade = Math.max(0.22, 1 - corrected / 10);
            const seam = (Math.floor(hit.hitX * 3) + Math.floor(hit.hitY * 3)) % 2;
            ctx.fillStyle = seam ? `rgba(255, 0, 255, ${shade})` : `rgba(0, 255, 255, ${shade})`;
            ctx.fillRect(i * strip, top, strip + 1, wallHeight);
            ctx.fillStyle = `rgba(255, 215, 0, ${shade * 0.32})`;
            ctx.fillRect(i * strip, top, strip + 1, 3);
            ctx.fillStyle = `rgba(0, 0, 0, ${0.15 + corrected / 14})`;
            ctx.fillRect(i * strip, top, strip + 1, wallHeight);
        }
        canvas._nsyncDepths = depths;
    }

    function drawSprites() {
        const sprites = enemies.concat(pickups.filter((pickup) => !pickup.taken));
        sprites
            .map((sprite) => ({
                sprite,
                distance: Math.hypot(sprite.x - player.x, sprite.y - player.y)
            }))
            .sort((a, b) => b.distance - a.distance)
            .forEach(({ sprite, distance }) => {
                const angle = normalizeAngle(Math.atan2(sprite.y - player.y, sprite.x - player.x) - player.angle);
                if (Math.abs(angle) > FOV * 0.65 || distance < 0.1) return;
                const screenX = (0.5 + angle / FOV) * viewW;
                const depthIndex = Math.floor((screenX / viewW) * (canvas._nsyncDepths || []).length);
                const wallDepth = (canvas._nsyncDepths || [Infinity])[depthIndex] || Infinity;
                if (distance > wallDepth + 0.25) return;

                if ("label" in sprite) {
                    drawPickup(screenX, distance, sprite.label);
                    return;
                }
                drawEnemy(screenX, distance, sprite);
            });
    }

    function drawEnemy(screenX, distance, foe) {
        const boss = foe.type === "boss";
        const size = Math.min(viewH * 0.88, (boss ? 95 : 58) / distance * 2.4);
        const x = screenX - size / 2;
        const y = viewH * 0.56 - size * (boss ? 0.68 : 0.58);
        const colors = {
            fashion: ["#ff69b4", "#ffd700"],
            bug: ["#00ffff", "#32cd32"],
            rival: ["#ff4500", "#ffffff"],
            boss: ["#6a0dad", "#ff0000"]
        }[foe.type];
        ctx.save();
        if (foe.hurt > 0) ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
        ctx.beginPath();
        ctx.ellipse(screenX, y + size * 0.92, size * 0.38, size * 0.09, 0, 0, TAU);
        ctx.fill();
        ctx.fillStyle = colors[0];
        ctx.fillRect(x + size * 0.22, y + size * 0.28, size * 0.56, size * 0.58);
        ctx.fillStyle = colors[1];
        ctx.fillRect(x + size * 0.3, y + size * 0.08, size * 0.4, size * 0.24);
        ctx.fillStyle = "#000000";
        ctx.fillRect(x + size * 0.37, y + size * 0.17, size * 0.07, size * 0.06);
        ctx.fillRect(x + size * 0.56, y + size * 0.17, size * 0.07, size * 0.06);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + size * 0.2, y + size * 0.48, size * 0.18, size * 0.08);
        ctx.fillRect(x + size * 0.62, y + size * 0.48, size * 0.18, size * 0.08);
        if (boss) {
            ctx.strokeStyle = "#ffd700";
            ctx.lineWidth = Math.max(2, size * 0.025);
            ctx.strokeRect(x + size * 0.18, y + size * 0.24, size * 0.64, size * 0.66);
        }
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(x + size * 0.2, y - 8, size * 0.6, 5);
        ctx.fillStyle = "#32cd32";
        ctx.fillRect(x + size * 0.2, y - 8, size * 0.6 * Math.max(0, foe.hp / foe.maxHp), 5);
        ctx.restore();
    }

    function drawPickup(screenX, distance, label) {
        const size = Math.min(52, 38 / distance * 2.3);
        const x = screenX - size / 2;
        const y = viewH * 0.58 - size * 0.5 + Math.sin(performance.now() / 180) * 4;
        ctx.save();
        ctx.fillStyle = "rgba(255, 215, 0, 0.25)";
        ctx.beginPath();
        ctx.arc(screenX, y + size / 2, size * 0.72, 0, TAU);
        ctx.fill();
        ctx.fillStyle = label === "cd" ? "#c0c0c0" : "#ffd700";
        ctx.fillRect(x, y, size, size * 0.72);
        ctx.fillStyle = "#ff00ff";
        ctx.fillRect(x + size * 0.16, y + size * 0.14, size * 0.68, size * 0.16);
        ctx.fillStyle = "#00ffff";
        ctx.fillRect(x + size * 0.2, y + size * 0.42, size * 0.6, size * 0.13);
        ctx.restore();
    }

    function drawParticles() {
        particles.forEach((p) => {
            const distance = Math.hypot(p.x - player.x, p.y - player.y);
            const angle = normalizeAngle(Math.atan2(p.y - player.y, p.x - player.x) - player.angle);
            if (Math.abs(angle) > FOV * 0.58 || distance < 0.1) return;
            const x = (0.5 + angle / FOV) * viewW;
            const y = viewH * 0.52 + (Math.random() - 0.5) * (70 / distance);
            const size = Math.max(2, 9 / distance);
            ctx.fillStyle = p.color;
            ctx.fillRect(x, y, size, size);
        });
    }

    function drawWeapon() {
        const bob = Math.sin(performance.now() / 90) * (player.dance > 0 ? 7 : 2);
        const baseX = viewW * 0.5;
        const baseY = viewH + bob;
        ctx.save();
        ctx.fillStyle = "#ff00ff";
        ctx.fillRect(baseX - 52, baseY - 68, 104, 58);
        ctx.fillStyle = "#00ffff";
        ctx.fillRect(baseX - 38, baseY - 58, 76, 34);
        ctx.fillStyle = "#ffd700";
        ctx.fillRect(baseX - 20, baseY - 76, 40, 18);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(baseX - 12, baseY - 50, 24, 10);
        ctx.restore();
    }

    function drawMiniMap() {
        const scale = Math.min(8, viewW / 88);
        const x0 = 10;
        const y0 = 10;
        ctx.save();
        ctx.globalAlpha = 0.86;
        ctx.fillStyle = "#000000";
        ctx.fillRect(x0 - 4, y0 - 4, world[0].length * scale + 8, world.length * scale + 8);
        for (let y = 0; y < world.length; y += 1) {
            for (let x = 0; x < world[y].length; x += 1) {
                ctx.fillStyle = world[y][x] === "#" ? "#ff00ff" : "#140016";
                ctx.fillRect(x0 + x * scale, y0 + y * scale, scale - 1, scale - 1);
            }
        }
        pickups.filter((pickup) => !pickup.taken).forEach((pickup) => {
            ctx.fillStyle = "#ffd700";
            ctx.fillRect(x0 + pickup.x * scale - 2, y0 + pickup.y * scale - 2, 4, 4);
        });
        enemies.forEach((foe) => {
            ctx.fillStyle = foe.type === "boss" ? "#ff0000" : "#00ffff";
            ctx.fillRect(x0 + foe.x * scale - 2, y0 + foe.y * scale - 2, 4, 4);
        });
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(x0 + player.x * scale, y0 + player.y * scale, 3, 0, TAU);
        ctx.fill();
        ctx.strokeStyle = "#ffd700";
        ctx.beginPath();
        ctx.moveTo(x0 + player.x * scale, y0 + player.y * scale);
        ctx.lineTo(x0 + (player.x + Math.cos(player.angle) * 0.8) * scale, y0 + (player.y + Math.sin(player.angle) * 0.8) * scale);
        ctx.stroke();
        ctx.restore();
    }

    function drawBootText() {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
        ctx.fillRect(0, viewH * 0.36, viewW, viewH * 0.22);
        ctx.fillStyle = "#ffd700";
        ctx.textAlign = "center";
        ctx.font = "700 22px Comic Sans MS, fantasy";
        ctx.fillText("*NSYNC DOOM: THE DEMO *sparkles* ✨", viewW / 2, viewH * 0.45);
        ctx.fillStyle = "#00ffff";
        ctx.font = "16px Comic Sans MS, fantasy";
        ctx.fillText("Press Start in the glitter window, bestie! *winks* 💖", viewW / 2, viewH * 0.52);
        ctx.restore();
    }

    function ensureAudio() {
        if (audioContext) return;
        const Audio = window.AudioContext || window.webkitAudioContext;
        if (Audio) audioContext = new Audio();
    }

    function beep(freq, duration, type, volume, delay) {
        if (!audioContext) return;
        const start = audioContext.currentTime + (delay || 0);
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.frequency.value = freq;
        osc.type = type || "square";
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(volume || 0.04, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        osc.connect(gain).connect(audioContext.destination);
        osc.start(start);
        osc.stop(start + duration + 0.02);
    }

    function startGame() {
        ensureAudio();
        if (audioContext && audioContext.state === "suspended") audioContext.resume();
        resetGame();
        running = true;
        overlay.hidden = true;
        canvas.focus();
        if (canvas.requestPointerLock && !/Mobi|Android/i.test(navigator.userAgent)) {
            try {
                const lockRequest = canvas.requestPointerLock();
                if (lockRequest && typeof lockRequest.catch === "function") lockRequest.catch(function () {});
            } catch (error) {
                // Keyboard and touch controls remain available if pointer lock is blocked.
            }
        }
        cancelAnimationFrame(raf);
        lastTime = performance.now();
        raf = requestAnimationFrame(loop);
    }

    function loop(now) {
        const dt = Math.min(0.05, (now - lastTime) / 1000 || 0);
        lastTime = now;
        update(dt);
        render();
        if (running) raf = requestAnimationFrame(loop);
    }

    startButton.addEventListener("click", startGame);
    canvas.addEventListener("click", shoot);
    canvas.addEventListener("pointerdown", function () {
        canvas.focus();
    });

    document.addEventListener("mousemove", function (event) {
        if (!running || document.pointerLockElement !== canvas) return;
        player.angle = normalizeAngle(player.angle + event.movementX * 0.0024);
    });

    window.addEventListener("keydown", function (event) {
        keys[event.code] = true;
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code) && document.activeElement === canvas) {
            event.preventDefault();
        }
        if (event.code === "Space") shoot();
        typed = (typed + event.key.toUpperCase()).slice(-8);
        if (typed === "MEEPMEEP" && running && !gameEnded) {
            if (!bossSpawned) {
                const spawn = chooseBossSpawn();
                bossSpawned = true;
                enemies.push(enemy(spawn.x, spawn.y, "boss"));
            }
            enemies.forEach((foe) => {
                foe.hp = 0;
            });
            player.score += 1000;
            player.glitter = 99;
            setStatus("Cheat accepted! Instant sparkle SUPREMACY! *adjusts crown* 👑");
            beep(1200, 0.12, "triangle", 0.06);
        }
    });

    window.addEventListener("keyup", function (event) {
        keys[event.code] = false;
    });

    root.querySelectorAll("[data-nsync-control]").forEach((button) => {
        const control = button.getAttribute("data-nsync-control");
        const down = function (event) {
            event.preventDefault();
            if (control === "shoot") {
                shoot();
            } else {
                virtual[control] = true;
            }
            canvas.focus();
        };
        const up = function () {
            virtual[control] = false;
        };
        button.addEventListener("pointerdown", down);
        button.addEventListener("pointerup", up);
        button.addEventListener("pointercancel", up);
        button.addEventListener("pointerleave", up);
    });

    window.addEventListener("resize", resizeCanvas);
    resetGame();
    resizeCanvas();
}());
