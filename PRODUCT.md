# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Vite + vanilla JS client, Node (Express) server with SQLite (`node:sqlite`), installable PWA, Docker deployment. Confirmed by the user: own server, internet deployment, mobile first.

## Users
A closed group of friends and classmates, Spanish speakers at roughly CEFR B1, who need to reach B2 and some of whom must pass an exam (TOEFL iBT or similar). They mostly use their phones, in short sessions on the bus, between classes or at home.

## Product Purpose
Take a B1 learner to B2 through daily practice of all skills, with speaking and listening first. Success is measurable progress from a diagnostic baseline to B2-level accuracy, plus exam readiness.

## Positioning
Duolingo-style habit mechanics (path, streak, short lessons, group ranking) but built for intermediate learners: typed production instead of tapping, no hearts, mastery gating (80%), spaced review of mistakes, listening and speaking at exam pace, and handwritten drafting.

## Operating Context
Phone browser, installed as a PWA. Speech synthesis and speech recognition come from the browser. Writing is drafted by hand (canvas or paper) and then transcribed for feedback. One shared group, invite code required to register.

## Capabilities and Constraints
- Account per person (name + password), progress, XP, streak and weekly group ranking.
- Adaptive diagnostic that places the learner on the path.
- Path of units and lessons, spaced review, speaking lab, listening lab, writing lab, exam mode notes.
- Feedback on writing is rule-based on the transcription; it is not an official score. Handwriting recognition is not implemented.
- All practice content is original; no official TOEFL/IELTS questions.
- UI language is Spanish; the practice content is English.

## Brand Commitments
Name: Upword. Tone: encouraging but demanding, never childish.

## Evidence on Hand
No real learner data or testimonials exist yet. Do not fabricate metrics.

## Product Principles
- Production beats recognition: make learners type, say and write.
- Short sessions, real difficulty.
- Honest feedback: never present local rules as an official exam score.
- The group is the motivation: visible streaks and weekly ranking.

## Accessibility & Inclusion
Phone-first touch targets (44px+), keyboard focus visible, contrast 4.5:1, reduced-motion respected, every audio exercise has a transcript path.
