---
layout: post
title: "WHAT KIND OF VAY CAY SOUL ARE YOU?? (a deeply scientific quiz by bicky naby) 🏔️💅🔥"
date: 2026-09-29
---

<style>
@keyframes quiz-glimmer {
  0%, 100% { text-shadow: 0 0 5px #FF00FF, 0 0 10px #FF00FF; }
  50% { text-shadow: 0 0 15px #FFFF00, 0 0 25px #FFFF00; }
}
@keyframes result-pop {
  0% { transform: scale(0.3) rotate(-5deg); opacity: 0; }
  70% { transform: scale(1.1) rotate(2deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
@keyframes floaty-sparkle {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(3deg); }
}
.quiz-body {
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', fantasy, sans-serif;
  padding: 20px;
  text-align: center;
}
.quiz-box {
  background: #000;
  color: #FFF;
  border: 5px solid #FF00FF;
  padding: 25px;
  margin: 20px auto;
  max-width: 650px;
  border-radius: 30px 8px 30px 8px;
  box-shadow: 8px 8px 0 #FFFF00;
  text-align: center;
  animation: floaty-sparkle 3s ease-in-out infinite;
}
.quiz-box h2 {
  color: #FFFF00;
  text-shadow: 2px 2px 0 #FF00FF;
  font-size: clamp(22px, 4vw, 34px);
}
.question-block {
  background: #1a0033;
  border: 3px solid #00FFFF;
  border-radius: 20px;
  padding: 18px;
  margin: 15px auto;
  max-width: 600px;
  color: #FFF;
  text-align: left;
}
.question-text {
  font-size: 1.2em;
  color: #FFD700;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}
.quiz-option {
  display: block;
  background: #33001a;
  color: #FFF;
  padding: 10px 14px;
  margin: 6px auto;
  border: 2px solid #FF00FF;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95em;
  max-width: 550px;
}
.quiz-option:hover {
  background: #FF00FF;
  color: #000;
  border-color: #FFFF00;
  transform: scale(1.02);
}
.quiz-option.selected {
  background: #FFFF00;
  color: #000;
  border-color: #FF00FF;
  font-weight: bold;
  box-shadow: 0 0 12px #FF00FF;
}
.quiz-submit {
  background: #FF00FF;
  color: #000;
  border: 4px solid #FFFF00;
  padding: 14px 30px;
  font-size: 1.4em;
  font-weight: bold;
  border-radius: 30px 8px;
  cursor: pointer;
  margin: 20px auto;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', fantasy, sans-serif;
  transition: 0.2s;
}
.quiz-submit:hover {
  transform: scale(1.08);
  box-shadow: 0 0 20px #FFFF00;
}
.result-box {
  display: none;
  animation: result-pop 0.6s ease-out forwards;
  margin: 20px auto;
  max-width: 600px;
  padding: 25px;
  border-radius: 50px 12px 50px 12px;
  text-align: center;
}
.result-box h2 {
  font-size: clamp(28px, 5vw, 42px);
  margin: 0 0 5px;
}
.result-box .result-icon {
  font-size: clamp(40px, 7vw, 60px);
  display: block;
  margin: 5px 0;
}
.result-desc {
  font-size: 1.05em;
  line-height: 1.5;
  padding: 10px;
}
.result-tag {
  display: inline-block;
  background: #000;
  border: 3px solid #FFF;
  padding: 6px 16px;
  border-radius: 20px;
  margin: 8px auto;
  font-size: 1em;
  font-weight: bold;
}
.quiz-reset {
  background: #000;
  color: #FFFF00;
  border: 3px dashed #FF00FF;
  padding: 10px 22px;
  font-size: 1.1em;
  border-radius: 25px;
  cursor: pointer;
  margin: 15px auto;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', fantasy, sans-serif;
}
.quiz-reset:hover {
  background: #FF00FF;
  color: #000;
  border-style: solid;
}
.progress-bar {
  background: #330033;
  border: 2px solid #FF00FF;
  border-radius: 20px;
  margin: 12px auto;
  max-width: 600px;
  overflow: hidden;
  text-align: center;
}
.progress-fill {
  background: #FF00FF;
  height: 100%;
  width: 0%;
  transition: width 0.4s;
  border-radius: 20px;
}
.progress-text {
  color: #FFF;
  font-size: 0.85em;
  padding: 4px;
}
.fandom-quote {
  background: #001122;
  border: 2px solid #00FFFF;
  border-radius: 15px;
  padding: 12px;
  margin: 15px auto;
  max-width: 500px;
  color: #00FFFF;
  font-style: italic;
  font-size: 0.9em;
}
</style>

<div class="quiz-body">

<div class="quiz-box">
<h2>✨ WHAT KIND OF VAY CAY SOUL ARE YOU?? ✨</h2>
<p style="font-size:0.95em;color:#FF00FF;">a deeply scientific quiz by <strong>bicky naby</strong> (results may shock u)</p>
<p style="font-size:0.85em;color:#FFFF00;">☆ inspired by real events that happened to me and grampa ☆</p>
</div>

<div class="fandom-quote">
"you take a vacation. the vacation does not take YOU. unless you're weak. are you weak?? let's find out." — bicky naby, tumblr philosopher
</div>

<div id="quiz-app" style="margin:10px auto;max-width:660px;">

<!-- question 1 -->
<div class="question-block" id="q1">
<span class="question-text">1️⃣ you wake up on the first day of vacation. what's the MOVE?? 🌅</span>
<div class="quiz-option" onclick="selectOption('q1',0)">A) immediately find a quiet spot to stare at a tree and process all your life choices. you're here to ✨ heal ✨ or whatever</div>
<div class="quiz-option" onclick="selectOption('q1',1)">B) blast britney in the car and DEMAND we take the scenic route. we didn't drive 4 hours to look at a PARKING LOT</div>
<div class="quiz-option" onclick="selectOption('q1',2)">C) check the wifi situation first. if it's bad we're LEAVING. i didn't bring 47 devices for NOTHING</div>
<div class="quiz-option" onclick="selectOption('q1',3)">D) immediately find something to set on fire. not in a weird way. in a ✨ camping ✨ way. probably a marshmallow.</div>
</div>

<!-- question 2 -->
<div class="question-block" id="q2">
<span class="question-text">2️⃣ you packed your bag. what's INSIDE?? 🎒</span>
<div class="quiz-option" onclick="selectOption('q2',0)">A) a journal, a book i'll pretend to read, snacks, and a mysterious rock i found in the driveway. it CALLED to me.</div>
<div class="quiz-option" onclick="selectOption('q2',1)">B) headphones, those sunglasses i stole from cvs, half a gas station coffee from yesterday, and AUDACITY</div>
<div class="quiz-option" onclick="selectOption('q2',2)">C) phone charger, backup phone charger, portable battery, backup portable battery, a single emergency protein bar, list of nearby hospitals</div>
<div class="quiz-option" onclick="selectOption('q2',3)">D) one (1) sock that doesn't have a pair, a lighter, and blind faith that the universe will provide the rest. it always does.</div>
</div>

<!-- question 3 -->
<div class="question-block" id="q3">
<span class="question-text">3️⃣ a WILD CREATURE appears on your path. what's your energy?? 🐻👁️👄👁️</span>
<div class="quiz-option" onclick="selectOption('q3',0)">A) freeze. make intense eye contact. whisper to it: "i mean you no harm. we are both just passing through." ✨ spiritual ✨</div>
<div class="quiz-option" onclick="selectOption('q3',1)">B) take a picture for the blog. name it Geoffrey. announce that it's your new mutual. tell it about your day.</div>
<div class="quiz-option" onclick="selectOption('q3',2)">C) scream. call your mom. ask if bears can climb. look up "wilderness protocol" on your phone. 6 tabs. panic.</div>
<div class="quiz-option" onclick="selectOption('q3',3)">D) try to feed it something. establish DOMINANCE. if it eats it you're friends. if it doesn't you're enemies. simple.</div>
</div>

<!-- question 4 -->
<div class="question-block" id="q4">
<span class="question-text">4️⃣ pick a VIBE that speaks to your soul 👴✨</span>
<div class="quiz-option" onclick="selectOption('q4',0)">A) grampa who falls asleep in the chair at 7pm with a half-eaten cracker in his hand. peaceful king. i want that energy.</div>
<div class="quiz-option" onclick="selectOption('q4',1)">B) grampa who tells the same story 4 times and each time it gets SLIGHTLY more dramatic. the stakes increase. cinema.</div>
<div class="quiz-option" onclick="selectOption('q4',2)">C) grampa who packed 3 different jackets for a weekend trip "just in case." he's READY. he's never been caught off guard since 1987.</div>
<div class="quiz-option" onclick="selectOption('q4',3)">D) grampa who eats a raw gas station marshmallow on the couch like a MONSTER. zero shame. zero fire. absolute legend.</div>
</div>

<!-- question 5 -->
<div class="question-block" id="q5">
<span class="question-text">5️⃣ your IDEAL souvenir is... 🧳</span>
<div class="quiz-option" onclick="selectOption('q5',0)">A) a cool stick. maybe some moss. a rock with a ✨ special ✨ shape. you'll display it on your shelf and tell people it's "decor."</div>
<div class="quiz-option" onclick="selectOption('q5',1)">B) a receipt from a weird diner that you'll keep in your wallet for 4 years for NO reason other than ✨ the vibes ✨</div>
<div class="quiz-option" onclick="selectOption('q5',2)">C) nothing. you took PHOTOS. you have iCloud. you don't need PHYSICAL objects asserting themselves in your SPACE.</div>
<div class="quiz-option" onclick="selectOption('q5',3)">D) a scar. a story. a lightly burnt object you found near the fire pit. a memory that will haunt your mutuals.</div>
</div>

<div id="progress-display" class="progress-bar">
<div class="progress-fill" id="progress-fill" style="width:0%;"></div>
<div class="progress-text" id="progress-text">0/5 questions answered</div>
</div>

<button class="quiz-submit" id="quiz-submit-btn" onclick="revealResult()">✨ REVEAL MY VAY CAY SOUL ✨</button>

</div>

<!-- RESULT CONTAINER -->
<div id="result-display">

</div>

<div class="fandom-quote" style="margin-top:25px;">
"in the words of a wise tumblr post i saw in 2013: you are valid. your vacation style is valid. even if you eat raw marshmallows on a couch. especially then." 🌟
</div>

</div>

<script>
// quiz data
const questions = {
  q1: 0, q2: 0, q3: 0, q4: 0, q5: 0
};
const answered = {
  q1: false, q2: false, q3: false, q4: false, q5: false
};

const results = [
  {
    id: "forest",
    icon: "🌲",
    title: "THE FOREST GOBLIN 🍄✨",
    bg: "#003300",
    border: "#00FF00",
    color: "#FFFF00",
    tag: "🌿 CERTIFIED MOSS ENJOYER 🌿",
    text: "you are a gentle creature of the woods who communicates with spiders and has strong opinions about moss varieties. you would thrive in a cabin with no electricity as long as you had a good book and a snack. people think you're shy but you're actually just *observing*. you notice things. you named a fungus once. you probably have a stick collection that you call 'decor.' you are valid and the forest loves you. 🍃💚",
    quote: "\"i'm not lonely. i'm ACCOMPANIED by the sounds of the forest. it's different.\" — you, probably, to someone who asked if you were okay"
  },
  {
    id: "roadtrip",
    icon: "🚗",
    title: "THE ROAD TRIP MENACE 🚙💨",
    bg: "#330033",
    border: "#FF6600",
    color: "#00FFFF",
    tag: "🔊 HAS OPINIONS ABOUT GAS STATIONS 🔊",
    text: "you are a FORCE OF NATURE disguised as a person. you thrive on chaos, gas station snacks, and playlists that start strong and get increasingly deranged. you've never met a detour you didn't like. your GPS HATES you. you're the main character of every story even the boring ones because you simply REFUSE to be a side character. you have approximately 47 opinions per hour and you share ALL of them. the open road loves you. 🌅💪",
    quote: "\"no i don't know where we're going but that's what makes it an ADVENTURE.\" — you, to grampa, who is clutching the map"
  },
  {
    id: "glamper",
    icon: "🏕️",
    title: "THE GLAMPER 👑📱",
    bg: "#000033",
    border: "#FFD700",
    color: "#FF00FF",
    tag: "📱 HAS A BACKUP FOR EVERYTHING 📱",
    text: "you believe nature is a concept that should be enjoyed through A WINDOW. you are resourceful, prepared, and you've never suffered unnecessarily when you could've just brought a better pillow. you're not 'high maintenance' — you're EFFICIENT. you know exactly what you need to survive and it includes a working bathroom and at least 3 bars of signal. you once googled 'hotels near hiking trail' and that's not a contradiction that's STRATEGY. the indoors loves you. 🏠💖",
    quote: "\"i can sleep outside IF i have to. i just don't see why i WOULD have to when there's a perfectly good cabin with a microwave right there.\" — you, fighting for your life against a granola person"
  },
  {
    id: "marshmallow",
    icon: "🔥",
    title: "THE BURNT MARSHMALLOW 🐷✨",
    bg: "#330000",
    border: "#FF6600",
    color: "#FFFF00",
    tag: "🚫 WILL NOT APOLOGIZE FOR HER TASTE 🚫",
    text: "you are a CHAOTIC FORCE of pure unapologetic ID. you make choices that are questionable at best and unhinged at worst but you stand by EVERY single one. you've eaten something you found on the ground. you've burned dinner on PURPOSE. you know what you like and you DON'T care if it's wrong because 'wrong' is a social construct invented by people who under-season their food. you are unstoppable. you have main character energy even when you're sitting in silence. fire loves you. 🔥💀",
    quote: "\"yes i BURNED it on purpose. that's how i like it. that's how it's SUPPOSED to be. you don't get it because you've never been BRAVE enough to try it my way.\" — you, defending your culinary choices at the campfire"
  }
];

function selectOption(qId, val) {
  const block = document.getElementById(qId);
  const opts = block.querySelectorAll('.quiz-option');
  opts.forEach(o => o.classList.remove('selected'));
  opts[val].classList.add('selected');
  questions[qId] = val;
  answered[qId] = true;

  // count answered
  let count = 0;
  for (let k in answered) { if (answered[k]) count++; }
  document.getElementById('progress-fill').style.width = (count * 20) + '%';
  document.getElementById('progress-text').innerText = count + '/5 questions answered';
  
  // hide old result if showing
  const rd = document.getElementById('result-display');
  rd.innerHTML = '';
}

function revealResult() {
  // check all answered
  for (let k in answered) {
    if (!answered[k]) {
      alert('bestie you gotta answer ALL the questions before i can reveal your soul 😭 pick the ones you missed!!');
      return;
    }
  }

  // count scores
  const scores = [0,0,0,0];
  for (let k in questions) {
    scores[questions[k]]++;
  }

  // find highest
  let maxIdx = 0;
  for (let i = 1; i < scores.length; i++) {
    if (scores[i] > scores[maxIdx]) maxIdx = i;
  }

  const r = results[maxIdx];
  const rd = document.getElementById('result-display');

  rd.innerHTML = `<div class="result-box" style="background:${r.bg};border:5px solid ${r.border};color:${r.color};display:block;">
    <div class="result-icon">${r.icon}</div>
    <h2 style="color:${r.color};text-shadow:2px 2px 0 ${r.border};">${r.title}</h2>
    <div class="result-tag" style="border-color:${r.border};color:${r.color};">${r.tag}</div>
    <div class="result-desc" style="color:#FFF;">${r.text}</div>
    <div style="background:#000;border:2px solid ${r.border};border-radius:15px;padding:12px;margin:12px auto;max-width:500px;color:${r.border};font-style:italic;">${r.quote}</div>
    <div style="margin:15px auto;">
      <span style="display:inline-block;background:${r.border};color:#000;padding:6px 16px;border-radius:20px;font-size:0.85em;margin:3px;">🌲 forest goblin: ${scores[0]}/5</span>
      <span style="display:inline-block;background:${r.border};color:#000;padding:6px 16px;border-radius:20px;font-size:0.85em;margin:3px;">🚗 road menace: ${scores[1]}/5</span>
      <span style="display:inline-block;background:${r.border};color:#000;padding:6px 16px;border-radius:20px;font-size:0.85em;margin:3px;">🏕️ glamper: ${scores[2]}/5</span>
      <span style="display:inline-block;background:${r.border};color:#000;padding:6px 16px;border-radius:20px;font-size:0.85em;margin:3px;">🔥 burnt marshmallow: ${scores[3]}/5</span>
    </div>
    <button class="quiz-reset" onclick="resetQuiz()">🔄 take again?? (you KNOW you want to)</button>
  </div>`;
}

function resetQuiz() {
  for (let k in answered) { answered[k] = false; questions[k] = 0; }
  for (let k in answered) {
    const block = document.getElementById(k);
    const opts = block.querySelectorAll('.quiz-option');
    opts.forEach(o => o.classList.remove('selected'));
  }
  document.getElementById('progress-fill').style.width = '0%';
  document.getElementById('progress-text').innerText = '0/5 questions answered';
  document.getElementById('result-display').innerHTML = '';
}
</script>

<p style="text-align:center;margin-top:25px;font-family:'Comic Sans MS','Chalkboard SE','Marker Felt',fantasy,sans-serif;font-size:0.8em;color:#888;">☆ quiz by bicky naby — results not guaranteed by any scientific institution ☆</p>