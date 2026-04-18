# HotPepperz Tone Audit

## Scope
This audit reviews user-facing wording across `src/pages`, `src/components`, and `src/data`, with legal copy judged under a separate clarity-and-compliance standard.

Reference inventory: [docs/wording_inventory.md](/Users/louispaulet/Documents/projects/hotpepperz/docs/wording_inventory.md)

Reference guideline: [tone_of_voice_guidelines.md](/Users/louispaulet/Documents/projects/hotpepperz/tone_of_voice_guidelines.md)

## Overall Read
- The strongest copy already sounds like a polished editorial food project: pepper profiles, recipe studies, and restaurant blurbs usually feel informed, sensory, and specific.
- The main mismatch is not lack of style. It is too much interface explanation. Several home and hub sections talk about routes, hierarchy, labels, categories, or destinations instead of leading with the actual value of the content.
- The second mismatch is a smaller set of theatrical or jokey workshop lines that undercut the otherwise premium, reference-led voice.
- Legal copy is appropriately separate in tone, but a few lines can be clearer and less awkwardly framed.

## Issue Types
- `de-productize`: too much product architecture or interface explanation.
- `tighten`: meaning is right, but the sentence is heavier than it needs to be.
- `de-hype`: phrasing is too theatrical, jokey, or gimmicky.
- `clarify`: wording is vague or indirect.
- `legal-clarify`: wording should stay formal but become clearer.

## Flagged wording and replacements
| Location | Current wording | Why it misses | Recommended replacement | Patch intent |
| --- | --- | --- | --- | --- |
| `src/pages/HomePage.jsx` hero H1 | “Browse peppers, origins, pairings, and legends without guessing where to click next.” | Leads with navigation friction instead of editorial value. | “Browse peppers, origins, pairings, and legends in one clear editorial reference.” | de-productize |
| `src/pages/HomePage.jsx` hero copy | “HotPepperz now works as a route-driven editorial encyclopedia. Start with the pepper profiles, jump into landscape-led origins, move into pairings and notebooks, or follow the broader history of how heat travelled.” | “Route-driven” and the step-by-step interface framing sound product-centric. | “HotPepperz now reads as an editorial encyclopedia: pepper profiles, origin landscapes, pairing studies, recipe notebooks, and the broader history of how heat travelled.” | de-productize |
| `src/pages/HomePage.jsx` featured pepper panel description | “Pepper pages now lead with origin, heat, climate, pairings, and related reading so the encyclopedia behaves more like a reference system and less like a poster wall.” | Strong idea, but “behaves more like” and “poster wall” feel like design-process commentary. | “Pepper pages lead with origin, heat, climate, pairings, and related reading so they work as quick-reference dossiers.” | tighten |
| `src/pages/HomePage.jsx` start-here panel title | “A clearer path into the pepper knowledge system.” | Generic and abstract. | “A clearer way into the pepper reference.” | clarify |
| `src/pages/HomePage.jsx` featured origins panel description | “The origins atlas now behaves like a browseable climate-and-region layer.” | Heavy UX/product phrasing. | “The origins atlas brings peppers back to climate, terrain, and growing region.” | de-productize |
| `src/pages/HomePage.jsx` pairings panel description | “The index now separates those content types instead of blending them together.” | Internal IA explanation, not reader value. | “Pairing studies focus on flavor logic, while recipe notebooks stay closer to the kitchen.” | de-productize |
| `src/pages/HomePage.jsx` legend panel description | “The history layer now sits as a dedicated story destination with clear links back to related peppers and routes across the encyclopedia.” | Reads like a content-model note, not editorial guidance. | “The history section gathers migration, trade, and adaptation into one story that connects back to related peppers.” | de-productize |
| `src/pages/WikiPage.jsx` hero H1 | “A directory-first atlas with clear routes into profiles, notebooks, spotlights, and legends.” | “Directory-first” and “clear routes” are architecture language. | “An atlas of pepper profiles, notebooks, restaurant spotlights, and legends.” | de-productize |
| `src/pages/WikiPage.jsx` hero copy | “Use this page as the structured front door to the encyclopedia. Each section below now behaves as a category with explicit type labels, visible actions, and clearer hierarchy instead of one long run of similar-looking cards.” | Talks about taxonomy and card structure instead of the content itself. | “Use this page to browse the encyclopedia by type: pepper profiles, pairings, restaurants, and legends.” | de-productize |
| `src/pages/WikiPage.jsx` recipe panel title | “Pairing studies and recipe notebooks are now explicitly different destinations.” | “Destinations” is product jargon. | “Pairing studies and recipe notebooks serve different kinds of reading.” | de-productize |
| `src/pages/WikiPage.jsx` restaurant panel title | “Restaurant pages now read like spotlights rather than unlabeled image tiles.” | Refers to old UI implementation rather than current editorial value. | “Restaurant pages now read as concise editorial spotlights.” | clarify |
| `src/pages/WikiPage.jsx` legend panel description | “The legend now lives as a clear story destination rather than a teaser block.” | “Lives as,” “destination,” and “teaser block” are implementation-history phrasing. | “The legend now stands as a full story about migration, trade, and adaptation.” | de-productize |
| `src/pages/OriginsAtlasPage.jsx` intro description | “This route now behaves as a landscape-first atlas.” | Product-journey phrasing. | “This atlas starts with landscapes, climates, and growing conditions.” | de-productize |
| `src/pages/HeatPairingsPage.jsx` intro description | “This route now separates two reading modes” | Sounds like interface mechanics. | “This page separates pairing studies from recipe notebooks.” | de-productize |
| `src/pages/LabPage.jsx` intro description | “This route stays practical” | Mildly productized. | “This workshop stays practical” | tighten |
| `src/components/Footer.jsx` brand description | “A pepper-first journal that now doubles as an editorial encyclopedia” | “Now doubles as” is transitional and process-oriented. | “A pepper-first journal and editorial encyclopedia” | tighten |
| `src/components/SauceStudio.jsx` configurator intro | “the workshop reads like a practical tool instead of a novelty generator.” | The contrast is understandable, but “novelty generator” is a bit defensive. | “the workshop stays practical and decision-led.” | tighten |
| `src/components/SauceStudio.jsx` step 4 copy | “A serious green sauce should not wear the costume of a prank bottle.” | Funny, but too theatrical for the project’s target voice. | “Let the label style match the sauce rather than competing with it.” | de-hype |
| `src/data/studioData.js` cayenne story | “pass the bottle” / “call a witness.” | The second half tips into gag copy. | “Many pantry hot sauces owe cayenne a debt. It gives that familiar straight-line burn that invites another spoonful rather than overwhelming the food.” | de-hype |
| `src/data/studioData.js` ghost pepper story | “The first bite can be a handshake; the next thirty seconds are the lawsuit.” | Memorable, but novelty-comic and off-brand for editorial reference. | “Bhut Jolokia gained world attention because its burn builds in waves, turning a measured first impression into serious sustained heat.” | de-hype |
| `src/data/legalContent.js` EN legal notice intro | “This page is a France-oriented compliance draft for an editorial website. It should be reviewed and completed before production publication.” | Accurate but slightly stiff and repetitive. | “This page is a France-oriented compliance draft for an editorial website. Review and complete it before publishing the site in production.” | legal-clarify |
| `src/pages/LegalPage.jsx` compliance note | “This text is provided as a compliance-oriented editorial draft for a France-facing site.” | A bit roundabout. | “This document is a compliance draft for a France-facing editorial site.” | legal-clarify |

## Recommended update order
- Start with home, wiki, atlas, pairings, and lab intros because they shape the brand voice fastest.
- Then remove the few workshop/story lines that drift into joke or stunt language.
- Finish with the small legal clarity edits.

## Notes
- Most pepper, recipe, restaurant, and legend entries already fit the target voice well.
- Accessibility `alt` text is generally serviceable and consistent with the premium editorial presentation; it does not need a broad rewrite.
