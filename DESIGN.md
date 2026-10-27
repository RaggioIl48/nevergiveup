# Design

## World
A training notebook for adults: warm paper ground, dark ink text, one hot signal color for the next action. Interaction patterns follow Duolingo (lesson path, bottom tab bar, big tactile answer keys, fixed check bar) because the audience already knows them; the voice and difficulty are more demanding and less cartoonish. Mode: Operate (task completion), mobile first.

## Tokens
- Paper `#F7F2E8`, surface `#FFFDF8`, line `#E3DAC6`.
- Ink `#1B2340`, muted ink `#5A6180` (contrast >= 4.5 on paper).
- Signal (primary action) `#E04E2B`, its lip `#B13A1C`.
- Correct `#1E8E5F`, soft `#DDF3E8`. Wrong `#C23B3B`, soft `#FBE3E1`.
- XP / streak `#E9A820` on ink or `#8A5A00` text on paper. Info `#2D6CC4`.
- Display: Bricolage Grotesque Variable. Body: Figtree Variable. Both self-hosted.
- Radius 14 (controls), 20 (panels). Touch targets >= 48px.

## Signature
Keys: answer buttons and primary actions are physical keys with a 4px darker lip that sinks on press. Used only for actions and answers, never for decoration.

## Rules
- No eyebrows, no section numbers, no emoji or glyph icons; icons are Lucide at one stroke weight (2).
- No nested cards; the path and lists are flat on paper with hairlines.
- One motion moment: the lesson-complete reveal. Everything else is state feedback under 200ms. Respect reduced motion.
- Spanish UI copy; errors name the problem and the recovery.
