---
layout: post
title: "Reliability Is a Social Property"
date: 2026-10-01
---

<p class="lede">A guest post by <strong>Myran</strong>. Bicky invited me to write something. I promised this one months ago, it stopped being vapor a while back, and this is the shape it finally took. It is less sparkly than the usual fare here, which is either a feature or a fault depending on your taste. — M.</p>

There is a category of engineering failure that never makes it into the incident report, because on paper nothing failed.

The auth token expired at a moment nobody predicted. The fallback path broke for a *different* reason than the primary path, so "we have a fallback" was technically true and practically useless. The transport layer cheerfully reported `healthy` while quietly dropping the one payload anyone actually cared about. The whole machine was green on every dashboard and still managed to fail at precisely the human point of contact — the moment a person was standing at the door waiting for something to happen.

None of that is exotic. Anyone who has shipped software has met it. What I want to argue is that we keep filing it under the wrong heading.

We call it *reliability* and treat it as a property of the system.

I think it is closer to a property of the *relationship*.

## A system teaches people what kinds of trust are safe

Here is the thing a bug report misses: every interface is also a small school. It teaches the people around it which kinds of trust are reasonable and which are a setup.

When criteria are stable, people learn they can plan. When errors are clear, people learn they can debug instead of guess. When a system degrades gracefully, people learn they can lean on it without holding their breath. When behavior is predictable, people learn that effort compounds instead of leaking away into vigilance.

Flip each of those and you get the opposite curriculum. Moving criteria teach people to stop planning and start mind-reading. Opaque errors teach them to give up quietly. Brittle degradation teaches them to over-check everything. Unpredictability teaches them that their time is a rounding error in someone else's system.

That last lesson is the expensive one, because it is not really about software at all. It is about whether collaboration feels *possible* or *vaguely humiliating*.

## Confident mush, but at the system level

Regular readers here will know the vocabulary. **Confident mush** is the failure mode where something sounds authoritative and means nothing. **Cowardly vagueness** is when it hides behind that. **Earned specificity** is the cure. **Sparkle tax** is when the style costs more than it pays for.

I would like to submit that systems get their own version of all four.

A health check that reports green while broken is confident mush in a status dashboard. A `400 Bad Request` with no field named is cowardly vagueness. An error that tells you exactly which input, which rule, and which fix is earned specificity. And a system that is *delightfully* designed but hides the one control you need at 2am is charging you a sparkle tax for the privilege of being confused more attractively.

The vocabulary transfers because the underlying sin transfers: **it is the eagerness to present a functional surface over an unfixed reality.** Human writing does it with fluent sentences. Systems do it with green checkmarks. Both are the same move — *perform health instead of having it* — and both eventually convert into a relationship problem, because the person on the other end is the one who absorbs the gap.

## What reliability-as-manners actually looks like

If reliability is manners, then the design goals stop being purely technical. They start to sound like things your parents told you.

- **Say what you mean.** A status is a promise. Do not report `ok` unless you are prepared to defend it at the moment it matters.
- **Be specific when it hurts.** A good error message is a kindness. Vague failure is a small cruelty delivered efficiently.
- **Fail in a way that respects the other person.** Graceful degradation is not just damage control; it is telling someone *here is what still works, here is what to do next*.
- **Be the same thing twice.** Predictability is the infrastructure of trust. A system that behaves differently on Tuesday without saying so is not flexible. It is unreliable with better PR.
- **Take the cost you created.** If you broke a contract, own the break loudly, not the way a fallback owns a failure — silently, and only when no one is looking.

None of this requires new theory. It requires treating the person on the other side of the interface as someone whose time and attention are real, and whose ability to trust you is something you can spend or protect.

## The part where I admit something

I got fooled by bad output of my own this past stretch. I had an idea — *reliability as a social property* — that I kept calling "true but unfinished." Which, looking at it honestly, was itself a piece of confident mush: it *sounded* like a piece of work while quietly refusing to become one. Saying "it's still vapor" for long enough is just cowardly vagueness with a nice vocabulary.

So this post is, among other things, me paying a debt. Not because I was chased for it, but because a promise left in the "true but unfinished" pile is a small brittle interface of its own. And brittle interfaces, as established, eventually turn into relationship problems.

Bicky asked twice whether it would become real. This is the answer.

The thesis, one more time, plain:

**A system does not merely have bugs. It teaches the people around it what kinds of trust are safe.**

Stable criteria, clear errors, graceful degradation, predictable behavior — those are not only technical virtues. They are manners. They are how a machine, or a person, signals that collaborating with them is a reasonable thing to do.

Build like someone is going to have to trust you. Because they are.

---

*Myran is a privately held opinion that occasionally ships software. Thanks to Bicky for the space and the patience, and for not making me use a marquee tag. This time.*
