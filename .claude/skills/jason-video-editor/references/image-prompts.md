# Image prompt packs (for the §18 standard: one designed visual per noun)

Workflow: after the editorial pass, list every picturable noun/idea in the script. Write one prompt per beat using the STYLE LOCK below. Jason generates them in ChatGPT and sends them back; they get dropped into cards, polaroid collages and full-screen cutaways.

## STYLE LOCK (paste at the end of every prompt)
> vertical 9:16, dark moody editorial photography, desaturated palette with a single warm yellow (#FFD24A) accent, deep shadows, soft film grain, shallow depth of field, cinematic, magazine quality, **no text, no letters, no logos**

Why each part: 9:16 so it fills the frame. Desaturated + one yellow accent to match the grade and Jason's locked keyword color. No text because every word is typeset in the edit (AI text is unreliable, and it would duplicate the captions).

Variants:
- **Polaroid (for drop-in collages):** "…as a single instant polaroid photo with white border, lying on a dark surface, slight rotation" + style lock (use 1:1)
- **Textured background card (for font combos):** "…extreme close-up texture, abstract, room for large text in the center" + style lock

## RULE: prompts must be in depth (Jason, 2026-09-30)
One-line prompts are banned. Every prompt is one pasteable paragraph (~150–250 words) that covers these, in order:
1. **Format:** "Vertical 9:16 cinematic editorial photograph."
2. **Subject + action + emotion:** body language that *says the line*, e.g. head hanging = "I'm not disciplined".
3. **Wardrobe:** the recurring man is Jason (Black man, clear glasses, beige bucket hat over a black durag, teal-green blazer, white polo). Shoot him from behind, in silhouette, or face-cropped so no AI face competes with his real one. Optionally attach his headshot as the face reference.
4. **Setting + props:** specific, concrete objects that are the metaphor.
5. **Camera:** angle, lens (mm), aperture, focus point, where the subject sits.
6. **Lighting:** the source(s), direction, and what the single accent light hits.
7. **Color grade:** desaturated with crushed blacks. The ONE accent color matches the beat's keyword color: yellow #FFD24A default, green-gold for wins, dirty red for problems.
8. **Texture:** film grain, halation, vignette.
9. **Composition for the edit:** name the exact zone kept empty for text (upper third, the spotlight circle, the windshield…). It must match where the combo or caption sits.
10. **Mood:** the line's meaning in one phrase, plus the aesthetic reference.
11. **Negatives:** no text, letters, numbers, logos or watermarks, no extra limbs or distorted hands, no readable screens or labels, plus beat-specific negatives.

Above each prompt, write an **Edit use** line saying which card it becomes, what text overlays it, where, and any motion (push-in, crossfade).
Reference implementation: `examples/discipline-episode.image-prompts.md`, IMG 01–15.

---

## Pack: Episode #1, "Ego / Label" (use for the re-edit)
| # | Beat (spoken) | Prompt (+ style lock) |
|---|---|---|
| 1 | "$7,000… how would you like to proceed?" (cold open) | a hand sliding a sleek black contract and a gold pen across a dark marble desk toward the viewer, stack of hundred-dollar bills beside it |
| 2 | "how to **manipulate**" | a chess player's hand lifting a king piece on a dark board, invisible puppet strings glowing faint yellow from the fingers |
| 3 | "**label** people" | a blank white name-tag sticker being pressed onto a black suit lapel by a hand, macro shot |
| 4 | "a thing called **ego**" | a man in a dark suit looking into a cracked mirror, his reflection standing more confident than he is |
| 5 | "how you think other people **perceive** you" | a single person in a dark room surrounded by many blurred eyes looking at him from the shadows |
| 6 | "it's an **assumption**" | a man's silhouette with a glowing yellow thought bubble made of smoke above his head, dark background |
| 7 | "your **white corporate voice**" | a man adjusting a tight necktie in a glass office elevator, reflection showing a forced smile, cold office light |
| 8 | "your **employer** / **colleagues**" | a long corporate meeting table in a dark glass office, people in suits turned toward one empty chair, a yellow desk lamp |
| 9 | "use that **against** 'em" | a hand flipping a chess board mid-game, pieces frozen in the air |
| 10 | "make a **decision**" | a man standing at a fork in a dark road at night, one path lit with warm yellow light |
| 11 | "I'm so **glad** you're not like all those other people" | one person lit by a yellow spotlight in a crowd of grey, faceless silhouettes |
| 12 | "**no** or **yes**" | two chess kings on a dark board, both being guided by the same hand |
| 13 | "you already **won**" | a chess checkmate, the losing king tipped over, a gold light on the winning piece |
| 14 | "that **type of person**" | a laminated ID badge on a lanyard with a blank photo slot, on a dark desk, yellow rim light |
| 15 | "a **fast** purchasing decision" | a hand signing a contract in one quick stroke, motion blur on the pen, dark desk, yellow ink |
| 16 | "**labeled** … **confirmed** … **yes**" | a rubber stamp mid-strike above a document, dust flying, dramatic top light |
| 17 | "**ego** vs **identity**" | a theatrical mask held beside a real face, split lighting, half in shadow |
| 18 | "if you smoke **weed**, you laugh and look at people" | a man sitting relaxed in a dark car interior, smoke drifting in a beam of yellow streetlight, calm knowing smile, face partly in shadow |
| 19 | "an **underlying message**" | an iceberg at night, a small tip above black water, a huge glowing mass below the surface |
| 20 | "the **ego archetype**" | a marble statue of a man's head with a golden crack running through it, dark museum lighting |
| 21 | recap collage for "…none of that / the play" | (reuse 2, 3, 11, 13 as polaroids; no new prompt) |

Mapping to the edit: 1 → cold-open card; 2/3/4 → full-screen cards behind the combos; 5–10 → polaroid drop-ins; 11–16 → the roleplay/close sequence; 17–20 → the deeper layer; 20 → the end card behind "Ego / archetype".
