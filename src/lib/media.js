export const editorialImages = {
  bottleLineup: {
    image: 'images/assorted-hot-sauce-bottles.jpg',
    alt: 'Assorted hot sauce bottles, lemons, and tabletop styling in a premium editorial composition',
    position: 'center center',
    creditLabel: 'Assorted Hot Sauce Bottles',
    creditHref: 'https://www.pexels.com/photo/assorted-hot-sauce-bottles-1124038/',
    creditMeta: 'Photo by iSAW Company on Pexels',
    featuredCredit: true,
  },
  pepperStillLife: {
    image: 'images/peppers-dark-still-life.jpg',
    alt: 'Red, yellow, and orange peppers arranged on a dark tabletop with dramatic food styling',
    position: 'center center',
    creditLabel: 'Three Yellow, Red and Orange Bell Peppers on Brown Surface',
    creditHref: 'https://www.pexels.com/photo/three-yellow-red-and-orange-bell-peppers-on-brown-surface-7017/',
    creditMeta: 'Photo by Snapwire on Pexels',
    featuredCredit: true,
  },
  habaneroMacro: {
    image: 'images/habanero-closeup-edit2.jpg',
    alt: 'Close-up orange habanero pepper with crisp texture detail',
    position: 'center 52%',
    creditLabel: 'Habanero closeup edit2.jpg',
    creditHref: 'https://commons.wikimedia.org/wiki/File:Habanero_closeup_edit2.jpg',
    creditMeta: 'Ryan Bushby via Wikimedia Commons, CC BY 2.5',
    featuredCredit: true,
  },
  nagaCluster: {
    image: 'images/naga-jolokia-peppers.jpg',
    alt: 'Cluster of wrinkled Naga Jolokia peppers photographed as a superhot reference',
    position: 'center center',
    creditLabel: 'Naga Jolokia Peppers.jpg',
    creditHref: 'https://commons.wikimedia.org/wiki/File:Naga_Jolokia_Peppers.jpg',
    creditMeta: 'Wikimedia Commons source',
    featuredCredit: true,
  },
  marketCrate: {
    image: 'images/market-peppers.jpg',
    alt: 'Overflowing market display of mixed hot peppers with saturated reds, oranges, and greens',
    position: 'center 42%',
    creditLabel: 'Market peppers',
    creditHref: 'https://commons.wikimedia.org/wiki/File:HotPeppersinMarket.jpg',
    creditMeta: 'Wikimedia Commons source',
  },
  heroChili: {
    image: 'images/hero-red-chili.jpg',
    alt: 'Single vivid red chili photographed as a clean, graphic hero image',
    position: 'center center',
    creditLabel: 'Hero red chili photo',
    creditHref: 'https://commons.wikimedia.org/wiki/File:Red_Chili_Pepper.jpg',
    creditMeta: 'Wikimedia Commons, public domain',
  },
  fermentedJar: {
    image: 'images/fermented-hot-sauce.jpg',
    alt: 'Fermented hot sauce photographed in a jar with rustic kitchen texture',
    position: 'center center',
    creditLabel: 'Fermented hot sauce',
    creditHref: 'https://commons.wikimedia.org/wiki/File:Fermented_hot_sauce.jpg',
    creditMeta: 'Wikimedia Commons source',
  },
  wikiHabanero: {
    image: 'images/wiki-habanero.jpg',
    alt: 'Habanero pepper reference photo with a clean educational framing',
    position: 'center center',
    creditLabel: 'Habanero reference photo',
    creditHref: 'https://commons.wikimedia.org/wiki/File:ARS-habanero.jpg',
    creditMeta: 'Wikimedia Commons source',
  },
  habaneroPlant: {
    image: 'images/habanero.jpg',
    alt: 'Orange habanero peppers hanging on the plant for a more natural field-guide look',
    position: 'center 35%',
    creditLabel: 'Habanero',
    creditHref: 'https://commons.wikimedia.org/wiki/File:Habanero_pepper.jpg',
    creditMeta: 'Wikimedia Commons source',
  },
  ajiAmarilloBottle: {
    image: 'images/aji-amarillo-sauce.png',
    alt: 'Generated Aji Amarillo hot sauce bottle render with bright yellow peppers on the label',
    position: 'center center',
  },
  trinidadScorpionBottle: {
    image: 'images/trinidad-scorpion-sauce.png',
    alt: 'Generated Trinidad Scorpion hot sauce bottle render with fiery black-and-red label art',
    position: 'center center',
  },
}

export const featuredImageCredits = Object.values(editorialImages)
  .filter((image) => image.featuredCredit)
  .map((image) => ({
    label: image.creditLabel,
    href: image.creditHref,
    meta: image.creditMeta,
  }))

export const homepageGallery = [
  editorialImages.bottleLineup,
  editorialImages.habaneroPlant,
  editorialImages.habaneroMacro,
  editorialImages.fermentedJar,
  editorialImages.heroChili,
  editorialImages.marketCrate,
  editorialImages.pepperStillLife,
]

export const labGallery = [
  editorialImages.bottleLineup,
  editorialImages.habaneroPlant,
  editorialImages.fermentedJar,
  editorialImages.marketCrate,
  editorialImages.habaneroMacro,
  editorialImages.pepperStillLife,
]

export const wikiGallery = [
  editorialImages.wikiHabanero,
  editorialImages.marketCrate,
  editorialImages.heroChili,
  editorialImages.nagaCluster,
  editorialImages.habaneroPlant,
  editorialImages.bottleLineup,
]

export function resolveImageSrc(baseUrl, image) {
  return image.startsWith('http') ? image : `${baseUrl}${image}`
}
