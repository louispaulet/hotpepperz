export const restaurants = [
  {
    slug: 'semma',
    name: 'Semma',
    city: 'New York City, United States',
    recognition: 'One MICHELIN Star',
    cuisine: 'Southern Indian cuisine',
    summary:
      'Semma is one of the clearest demonstrations that assertive chili heat can live comfortably in a polished dining room. The cooking stays regional, direct, and proudly spicy.',
    whyItMatters:
      'The MICHELIN Guide explicitly notes that the dishes are spicy and that the heat is used elegantly. That makes Semma a strong reference point for pepper-forward fine dining rather than novelty heat.',
    relatedPepperSlugs: ['birds-eye-chili', 'madame-jeanette', 'datil'],
    sourceLinks: [
      { label: 'MICHELIN Guide: Semma', href: 'https://guide.michelin.com/en/new-york-state/new-york/restaurant/semma' },
      { label: 'Restaurant website', href: 'https://www.semma.nyc/' },
    ],
  },
  {
    slug: 'sorn',
    name: 'Sorn',
    city: 'Bangkok, Thailand',
    recognition: 'Three MICHELIN Stars',
    cuisine: 'Southern Thai cuisine',
    summary:
      'Sorn is a landmark for chili-rich cuisine in fine dining, translating Southern Thai intensity into a rigorously paced tasting menu.',
    whyItMatters:
      'The current MICHELIN Guide listing describes exhilarating flavors in perfect harmony and marks Sorn with Three Stars, making it one of the strongest restaurant anchors for this encyclopedia.',
    relatedPepperSlugs: ['birds-eye-chili', 'fatalii'],
    sourceLinks: [
      { label: 'MICHELIN Guide: Sorn', href: 'https://guide.michelin.com/en/bangkok-region/bangkok/restaurant/sorn' },
      { label: 'Restaurant website', href: 'https://www.sornfinesouthern.com/' },
    ],
  },
  {
    slug: 'gaggan-at-louis-vuitton',
    name: 'Gaggan at Louis Vuitton',
    city: 'Bangkok, Thailand',
    recognition: 'Fine dining reference',
    cuisine: 'Progressive tasting menu',
    summary:
      'This venue extends Gaggan Anand’s theatrical, spice-aware approach into a luxury collaboration context where heat reads as both flavor and performance.',
    whyItMatters:
      'It is not included here as a Michelin claim. It belongs because it is a current fine-dining destination built by a chef deeply associated with progressive, spice-driven cooking in Bangkok.',
    relatedPepperSlugs: ['piri-piri', 'fatalii', 'birds-eye-chili'],
    sourceLinks: [
      { label: 'Official Gaggan site', href: 'https://gaggan.com/' },
      { label: 'Louis Vuitton / venue context', href: 'https://eu.louisvuitton.com/eng-e1/magazine/articles/lv-the-place-bangkok' },
    ],
  },
  {
    slug: 'lorea',
    name: 'Lorea',
    city: 'Mexico City, Mexico',
    recognition: 'MICHELIN Guide listed',
    cuisine: 'Contemporary Mexican',
    summary:
      'Lorea is relevant not because every dish is fiery, but because it places chiles inside a contemporary tasting-menu vocabulary without reducing them to garnish.',
    whyItMatters:
      'The current MICHELIN Guide listing highlights a fried chili course and positions the restaurant as a modern Mexican fine-dining room, which makes it a natural bridge between pepper culture and tasting-menu format.',
    relatedPepperSlugs: ['rocoto', 'chile-de-arbol', 'piri-piri'],
    sourceLinks: [
      { label: 'MICHELIN Guide: Lorea', href: 'https://guide.michelin.com/us/en/ciudad-de-mexico/cuauhtemoc_1995126/restaurant/lorea' },
      { label: 'Restaurant website', href: 'https://lorea.mx/' },
    ],
  },
  {
    slug: 'nicos',
    name: 'Nicos',
    city: 'Mexico City, Mexico',
    recognition: 'MICHELIN Guide listed',
    cuisine: 'Traditional Mexican',
    summary:
      'Nicos grounds the encyclopedia in a restaurant where chili heat is inseparable from classic Mexican cooking rather than a stand-alone gimmick.',
    whyItMatters:
      'The current MICHELIN Guide description specifically notes dishes with feisty chili kick, making Nicos a strong example of traditional cooking with fine-dining relevance.',
    relatedPepperSlugs: ['chile-de-arbol'],
    sourceLinks: [
      { label: 'MICHELIN Guide: Nicos', href: 'https://guide.michelin.com/us/en/ciudad-de-mexico/azcapotzalco_1993967/restaurant/nicos' },
      { label: 'Restaurant website', href: 'https://nicosmexico.com/' },
    ],
  },
  {
    slug: 'tong-fu-she',
    name: 'Tong Fu She',
    city: 'Chengdu, China',
    recognition: 'MICHELIN Guide listed',
    cuisine: 'Sichuan',
    summary:
      'Tong Fu She brings the encyclopedia into Sichuan territory, where heat is layered with aroma, numbing spice, and heirloom home-style technique.',
    whyItMatters:
      'The current MICHELIN Guide listing emphasizes spicy, aromatic eel and heirloom recipes, making it a clear Sichuan stop with real pepper relevance.',
    relatedPepperSlugs: ['cheongyang', 'birds-eye-chili'],
    sourceLinks: [
      { label: 'MICHELIN Guide: Tong Fu She', href: 'https://guide.michelin.com/us/en/chengdu-municipality/chengdu/restaurant/tong-fu-she' },
    ],
  },
  {
    slug: 'central',
    name: 'Central',
    city: 'Lima, Peru',
    recognition: 'Fine dining reference',
    cuisine: 'Peruvian tasting menu',
    summary:
      'Central appears here as an ingredient-context destination: a place to understand Peruvian biodiversity and the broader world around peppers such as rocoto and aji varieties.',
    whyItMatters:
      'It is not framed as a chili challenge house. It belongs because it helps explain the ingredient intelligence and regional vocabulary that shape Peruvian pepper culture.',
    relatedPepperSlugs: ['rocoto'],
    sourceLinks: [
      { label: 'Restaurant website', href: 'https://centralrestaurante.com.pe/en/default.html' },
    ],
  },
]

export const restaurantMap = Object.fromEntries(restaurants.map((restaurant) => [restaurant.slug, restaurant]))
