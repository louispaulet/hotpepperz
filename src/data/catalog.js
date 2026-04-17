import { editorialImages } from '../lib/media'

export const peppers = [
  {
    id: 'jalapeno',
    name: 'Jalapeno',
    shuMin: 2500,
    shuMax: 8000,
    heatBand: 'Foundational heat',
    region: 'Mexico',
    notes: ['green', 'fresh', 'crisp'],
    pairings: ['lime', 'roasted garlic', 'cilantro'],
    bestFor: 'Salsa verde, breakfast sauces, taco drizzles, bright green ferments.',
    tone: '#7db84d',
    image: 'images/jalapeno-peppers.png',
    imagePosition: 'center 58%',
    story:
      'A jalapeno is the pepper equivalent of a dependable chef knife: it reaches for freshness first, not brute force. When allowed to ripen red and smoke into chipotle, it proves that one pepper can live two delicious lives.',
  },
  {
    id: 'serrano',
    name: 'Serrano',
    shuMin: 10000,
    shuMax: 23000,
    heatBand: 'Everyday table heat',
    region: 'Mexico',
    notes: ['grassy', 'lively', 'clean'],
    pairings: ['lime zest', 'cucumber', 'tomatillo'],
    bestFor: 'Daily table sauces that need lift, bite, and quick brightness.',
    tone: '#67b646',
    image: 'images/serrano-peppers.png',
    imagePosition: 'center center',
    story:
      'Serrano brings a narrower, sharper heat than jalapeno, which is why so many Mexican table salsas feel fast on the palate. It is a small pepper with a short fuse and excellent manners.',
  },
  {
    id: 'cayenne',
    name: 'Cayenne',
    shuMin: 30000,
    shuMax: 50000,
    heatBand: 'Classic sauce heat',
    region: 'French Guiana to global cultivation',
    notes: ['peppery', 'dry', 'classic'],
    pairings: ['garlic', 'vinegar', 'paprika'],
    bestFor: 'Old-school table sauces, wing sauces, and vinegar-led bottles.',
    tone: '#db5c30',
    image: 'images/cayenne.png',
    imagePosition: 'center 42%',
    story:
      'Many pantry hot sauces owe cayenne a debt. It gives that familiar straight-line burn that says “pass the bottle” rather than “call a witness.”',
  },
  {
    id: 'aji_amarillo',
    name: 'Aji Amarillo',
    shuMin: 30000,
    shuMax: 50000,
    heatBand: 'Fragrant medium heat',
    region: 'Peru',
    notes: ['sunny', 'tropical', 'floral'],
    pairings: ['mango', 'pineapple', 'ginger'],
    bestFor: 'Peruvian-style table sauces, creamy emulsions, and fruit-bright blends.',
    tone: '#f4a61b',
    image: 'images/aji-amarillo.png',
    imagePosition: 'center center',
    story:
      'Aji amarillo is one of those peppers that teaches humility: the heat is moderate, but the aroma does most of the talking. It lends a sauce a golden color and a whiff of orchard fruit without becoming sugary.',
  },
  {
    id: 'habanero',
    name: 'Habanero',
    shuMin: 100000,
    shuMax: 350000,
    heatBand: 'Fruit-led high heat',
    region: 'Yucatan and the Caribbean',
    notes: ['fruity', 'lantern', 'lush'],
    pairings: ['mango', 'carrot', 'orange zest'],
    bestFor: 'Tropical sauces, glossy glazes, carrot-led blends, and bright ferments.',
    tone: '#ff8f3f',
    image: editorialImages.habaneroMacro.image,
    imagePosition: editorialImages.habaneroMacro.position,
    story:
      'Habanero remains the great lesson in pepper mischief: the aroma arrives almost friendly, then the heat reminds you that perfume and peril can share the same lantern-shaped shell.',
  },
  {
    id: 'scotch_bonnet',
    name: 'Scotch Bonnet',
    shuMin: 100000,
    shuMax: 350000,
    heatBand: 'Perfumed island heat',
    region: 'Caribbean',
    notes: ['jammy', 'island', 'perfumed'],
    pairings: ['pineapple', 'allspice', 'brown sugar'],
    bestFor: 'Caribbean pepper sauces, jerk accompaniments, and rounded fruit-forward blends.',
    tone: '#ffbb59',
    image: 'images/scotch-bonnet.png',
    imagePosition: 'center 30%',
    story:
      'Scotch bonnet is a pepper with rhythm. In traditional Caribbean cooking it does not merely make food hot; it perfumes stews, marinades, and sauces so the heat feels woven in rather than bolted on.',
  },
  {
    id: 'ghost',
    name: 'Ghost Pepper',
    shuMin: 800000,
    shuMax: 1041427,
    heatBand: 'Delayed superhot',
    region: 'India',
    notes: ['haunting', 'smoky', 'slow-bloom'],
    pairings: ['cacao', 'smoke', 'tamarind'],
    bestFor: 'Dark sauces, concentrated chili pastes, and carefully rationed superhot bottles.',
    tone: '#cd4a33',
    image: editorialImages.nagaCluster.image,
    imagePosition: editorialImages.nagaCluster.position,
    story:
      'Bhut Jolokia gained world attention because its burn does not simply arrive, it builds. The first bite can be a handshake; the next thirty seconds are the lawsuit.',
  },
  {
    id: 'scorpion',
    name: 'Trinidad Scorpion',
    shuMin: 1200000,
    shuMax: 2009231,
    heatBand: 'Needlepoint superhot',
    region: 'Trinidad and Tobago',
    notes: ['electric', 'sharp', 'sting'],
    pairings: ['citrus', 'fermented garlic', 'honey'],
    bestFor: 'Precision heat spikes, challenge sauces, and tiny corrective additions.',
    tone: '#b72c14',
    image: 'images/trinidad-scorpion.png',
    imagePosition: 'center 42%',
    story:
      'Trinidad Scorpion earns its name honestly. Its heat is less bonfire than barb: quick, bright, and pointed, the kind of burn that makes a sauce feel sharpened.',
  },
  {
    id: 'reaper',
    name: 'Carolina Reaper',
    shuMin: 1400000,
    shuMax: 2200000,
    heatBand: 'Apex heat',
    region: 'United States',
    notes: ['feral', 'black cherry', 'apex'],
    pairings: ['cacao', 'berry', 'molasses'],
    bestFor: 'Reserve superhot bottles, tasting drops, and microscopic adjustments.',
    tone: '#7e130a',
    image: 'images/carolina-reaper.png',
    imagePosition: 'center 46%',
    story:
      'The Carolina Reaper is famous enough to attract thrill seekers, but experienced sauce makers treat it like expensive salt: a little changes everything, and too much erases the dish beneath it.',
  },
]

export const accents = [
  {
    id: 'mango',
    name: 'Ripe mango',
    role: 'Sweetness',
    notes: ['lush sweetness', 'tropical roundness'],
    tone: '#f6b63b',
  },
  {
    id: 'pineapple',
    name: 'Charred pineapple',
    role: 'Brightness',
    notes: ['caramelized brightness', 'acid lift'],
    tone: '#ecd972',
  },
  {
    id: 'lime',
    name: 'Lime zest',
    role: 'Acidity',
    notes: ['sharp acidity', 'green perfume'],
    tone: '#8ee268',
  },
  {
    id: 'garlic',
    name: 'Roasted garlic',
    role: 'Depth',
    notes: ['savory depth', 'soft sweetness'],
    tone: '#e9d7ab',
  },
  {
    id: 'smoke',
    name: 'Mesquite smoke',
    role: 'Finish',
    notes: ['campfire backbone', 'dark finish'],
    tone: '#a06a4f',
  },
  {
    id: 'tamarind',
    name: 'Tamarind',
    role: 'Tang',
    notes: ['sticky tang', 'deep acidity'],
    tone: '#8f4931',
  },
  {
    id: 'hibiscus',
    name: 'Hibiscus',
    role: 'Floral lift',
    notes: ['ruby tartness', 'floral snap'],
    tone: '#cb4f79',
  },
  {
    id: 'cacao',
    name: 'Cacao nib',
    role: 'Body',
    notes: ['bittersweet depth', 'mole character'],
    tone: '#6b412b',
  },
]

export const labelStyles = [
  {
    id: 'screenprint',
    name: 'Screenprint Reserve',
    mood: 'Bold, tactile, assertive, rooted in classic chili poster graphics.',
    promptTone: 'serious craft hot sauce label, screenprinted texture, strong typography, premium bottle packaging',
  },
  {
    id: 'apothecary',
    name: 'Apothecary Archive',
    mood: 'Ornate, old-world, collector-minded, inspired by spice merchant labels.',
    promptTone: 'refined apothecary hot sauce label, engraved border, archival typography, premium bottle packaging',
  },
  {
    id: 'field-notes',
    name: 'Kitchen Ledger',
    mood: 'Ingredient-led, practical, modern, like a notebook from a fermentation bench.',
    promptTone: 'serious culinary packaging label, ingredient study, elegant modern type, tactile paper stock',
  },
  {
    id: 'psychedelic',
    name: 'Festival Heat',
    mood: 'Vivid, loud, celebratory, for sauces that want a little swagger on the shelf.',
    promptTone: 'bold hot sauce label art, saturated chili palette, dramatic composition, premium packaging',
  },
]

export const houseSauces = [
  {
    name: 'Mercado Verde',
    heat: 'Medium',
    profile: 'Serrano, aji amarillo, roasted garlic, lime',
    bestOn: 'Egg tacos, grilled corn, roast chicken',
    story:
      'A bright daily table sauce inspired by the market habit every sauce maker should keep: buy the best peppers first, then decide what the bottle wants to be.',
    tone: '#f0a546',
  },
  {
    name: 'Yucatan Lantern',
    heat: 'Hot',
    profile: 'Habanero, scotch bonnet, mango, hibiscus',
    bestOn: 'Fried shrimp, jerk vegetables, rice bowls',
    story:
      'Tropical on the nose, disciplined on the palate. The fruit softens the landing, but the bonnet and habanero still get the last word.',
    tone: '#ff8d54',
  },
  {
    name: 'Midnight Molino',
    heat: 'Very hot',
    profile: 'Ghost pepper, tamarind, cacao, mesquite',
    bestOn: 'Short ribs, mole-style marinades, late-night pizza',
    story:
      'Built for dark sauces and long braises, with enough bitterness and smoke to keep the superhot burn from feeling juvenile.',
    tone: '#a2482f',
  },
  {
    name: 'Coastal Gold',
    heat: 'Medium-hot',
    profile: 'Aji amarillo, habanero, pineapple, lime',
    bestOn: 'Fish tacos, roasted squash, grain bowls',
    story:
      'Aji amarillo brings perfume, habanero brings conviction, and pineapple keeps the bottle lively rather than merely loud.',
    tone: '#f3c757',
  },
]

export const sauceFamilies = [
  {
    name: 'Green Table Sauces',
    description: 'Fresh, sharp sauces built on green peppers, herbs, citrus, and vinegar.',
    bestFor: 'Seafood, tacos, eggs, vegetables.',
    buildCue: 'Keep the ingredient list short and let brightness do the heavy lifting.',
  },
  {
    name: 'Caribbean Fruit-Forward',
    description: 'Perfumed, tropical bottles where sweetness supports heat without dulling it.',
    bestFor: 'Chicken, rice bowls, fried foods.',
    buildCue: 'Scotch bonnet and habanero pair beautifully with fruit when acid keeps them honest.',
  },
  {
    name: 'Dark Roasted Bottles',
    description: 'Sauces with smoke, tamarind, cacao, and a slower, deeper finish.',
    bestFor: 'Steak, mushrooms, barbecue, mole-inspired cooking.',
    buildCue: 'A dark sauce needs weight underneath the heat, not just more Scoville.',
  },
  {
    name: 'Superhot Reserve',
    description: 'High-intensity bottles made for measured pours, tastings, and serious chili heads.',
    bestFor: 'Tasting flights, challenge drops, tiny finishing dabs.',
    buildCue: 'Use superhots as structure and punctuation; if the sauce only shouts, it cannot sing.',
  },
]

export const labSteps = [
  {
    title: 'Choose the pepper base',
    copy: 'Start with one lead pepper and one support pepper so the heat has shape, not just volume.',
  },
  {
    title: 'Balance acid, sweetness, and body',
    copy: 'A good sauce stands on three legs: brightness, depth, and texture. If one is missing, the bottle limps.',
  },
  {
    title: 'Decide how it should mature',
    copy: 'Some sauces want a fresh finish, others want fermentation, roasting, or a cooked reduction before bottling.',
  },
]

export const pairingRules = [
  'Build from the food outward. Wing sauce, taco salsa, and Caribbean pepper sauce are cousins, not twins.',
  'One dominant pepper and one support pepper are usually enough to tell a clear story.',
  'Acid makes a sauce feel quick, fruit makes it welcoming, and smoke makes it feel older than it is.',
  'Capsaicin is oil-loving and persistent, which is why dairy calms a burn better than water ever will.',
]

export const safetyChecklist = [
  'Wear gloves when handling ghost, scorpion, or reaper peppers, and do not learn this lesson the hard way.',
  'Ventilate the room when roasting or reducing superhots unless you enjoy turning your kitchen into pepper spray.',
  'Label high-heat bottles clearly so guests know whether they are reaching for table sauce or trouble.',
  'Taste superhot batches by the drop. Serious sauce makers test like chemists, not daredevils.',
]

export const traditionalRecipes = [
  {
    name: 'Salsa Roja Taquera',
    origin: 'Central Mexico',
    ingredients: 'dried chiles de arbol, tomato, garlic, onion, vinegar, salt',
    method:
      'Toast the chiles briefly, simmer with tomato and aromatics, then blend smooth. The point is quick heat and clean acidity, not thickness.',
  },
  {
    name: 'Caribbean Scotch Bonnet Pepper Sauce',
    origin: 'Jamaica and the wider Caribbean',
    ingredients: 'scotch bonnet, vinegar, onion, carrot, mustard, allspice, thyme',
    method:
      'Blend raw or lightly cooked ingredients into a bright table sauce. Many island versions lean on mustard and allspice to round out the bonnet’s floral heat.',
  },
  {
    name: 'Aji Amarillo Table Sauce',
    origin: 'Peru',
    ingredients: 'aji amarillo, lime, garlic, onion, oil, salt',
    method:
      'Blend roasted or sauteed aji amarillo with lime and a little oil until glossy. It belongs beside pollo a la brasa, ceviche accompaniments, and roast vegetables.',
  },
]

export const pepperTrivia = [
  {
    title: 'Why chilies burn',
    copy:
      'Capsaicin does not create heat in the food itself; it binds to pain receptors that normally respond to temperature. Your tongue is not on fire, but it certainly files the paperwork that way.',
  },
  {
    title: 'The Scoville shortcut',
    copy:
      'Scoville numbers are useful, but they are not the whole story. A 50,000 SHU cayenne sauce and a 50,000 SHU aji amarillo sauce can behave very differently because aroma, sugar, acid, and texture steer the burn.',
  },
  {
    title: 'Red does not always mean riper flavor',
    copy:
      'Many green peppers become sweeter and more complex as they ripen, but some sauces depend on the snappy, grassy tension of the unripe stage. A pepper can mellow with age just like a good cook.',
  },
  {
    title: 'Fermentation changes more than tang',
    copy:
      'During fermentation, peppers lose their raw edge, gain savory depth, and become easier to layer with garlic, fruit, or smoke. Good ferments are less about funk for its own sake and more about patience paying rent.',
  },
]

export const heatDestinations = [
  {
    name: "Prince's Hot Chicken",
    city: 'Nashville, United States',
    dish: 'Nashville hot chicken',
    href: 'https://www.princeshotchicken.com/',
    note: 'The classic pilgrimage for anyone who wants to understand hot chicken at the source.',
  },
  {
    name: 'Dhamaka',
    city: 'New York, United States',
    dish: 'Bold regional Indian cooking',
    href: 'https://www.dhamaka.nyc/',
    note: 'A strong stop for deeply spiced dishes that are unapologetic about heat and regional character.',
  },
  {
    name: 'Semma',
    city: 'New York, United States',
    dish: 'Southern Indian cuisine',
    href: 'https://www.semma.nyc/',
    note: 'Elegant use of spice, proof that serious heat and fine dining can share the same tablecloth.',
  },
  {
    name: 'Sorn',
    city: 'Bangkok, Thailand',
    dish: 'Southern Thai cuisine',
    href: 'https://guide.michelin.com/en/bangkok-region/bangkok/restaurant/sorn',
    note: 'A benchmark for Southern Thai cooking, where chilies, herbs, and seafood build layered intensity.',
  },
  {
    name: 'Gaggan',
    city: 'Bangkok, Thailand',
    dish: 'Progressive Indian tasting menu',
    href: 'https://gaggan.com/',
    note: 'For travelers who want to see how chili heat can be translated into playful, modern fine dining.',
  },
  {
    name: 'Central',
    city: 'Lima, Peru',
    dish: 'Peruvian tasting menu with native ingredients',
    href: 'https://centralrestaurante.com.pe/en/default.html',
    note: 'Not a chile challenge house, but an essential Lima reference for understanding Peru’s ingredient vocabulary, including aji culture.',
  },
]
