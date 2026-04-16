export const editorialImages = {
  bottleLineup: {
    image: 'images/assorted-hot-sauce-bottles.png',
    alt: 'Assorted hot sauce bottles, lemons, and tabletop styling in a premium editorial composition',
    position: 'center center',
    creditLabel: 'House editorial bottle study',
    creditMeta: 'Generated with gpt-image-1.5 for the HotPepperz project',
    featuredCredit: true,
  },
  pepperStillLife: {
    image: 'images/peppers-dark-still-life.png',
    alt: 'Red, yellow, and orange peppers arranged on a dark tabletop with dramatic food styling',
    position: 'center center',
    creditLabel: 'House pepper still life',
    creditMeta: 'Generated with gpt-image-1.5 for the HotPepperz project',
    featuredCredit: true,
  },
  habaneroMacro: {
    image: 'images/habanero-closeup.png',
    alt: 'Close-up orange habanero pepper with crisp texture detail',
    position: 'center 52%',
    creditLabel: 'House habanero macro',
    creditMeta: 'Generated with gpt-image-1.5 for the HotPepperz project',
    featuredCredit: true,
  },
  nagaCluster: {
    image: 'images/naga-jolokia-peppers.png',
    alt: 'Cluster of wrinkled Naga Jolokia peppers photographed as a superhot reference',
    position: 'center center',
    creditLabel: 'House ghost pepper cluster',
    creditMeta: 'Generated with gpt-image-1.5 for the HotPepperz project',
    featuredCredit: true,
  },
  marketCrate: {
    image: 'images/market-peppers.png',
    alt: 'Overflowing market display of mixed hot peppers with saturated reds, oranges, and greens',
    position: 'center 42%',
    creditLabel: 'House market crate',
    creditMeta: 'Generated with gpt-image-1.5 for the HotPepperz project',
  },
  heroChili: {
    image: 'images/hero-red-chili.png',
    alt: 'Single vivid red chili photographed as a clean, graphic hero image',
    position: 'center center',
    creditLabel: 'House hero chili',
    creditMeta: 'Generated with gpt-image-1.5 for the HotPepperz project',
  },
  fermentedJar: {
    image: 'images/fermented-hot-sauce.png',
    alt: 'Fermented hot sauce photographed in a jar with rustic kitchen texture',
    position: 'center center',
    creditLabel: 'House fermentation study',
    creditMeta: 'Generated with gpt-image-1.5 for the HotPepperz project',
  },
  wikiHabanero: {
    image: 'images/wiki-habanero.png',
    alt: 'Habanero pepper reference photo with a clean educational framing',
    position: 'center center',
    creditLabel: 'House habanero reference',
    creditMeta: 'Generated with gpt-image-1.5 for the HotPepperz project',
  },
  habaneroPlant: {
    image: 'images/habanero-plant.png',
    alt: 'Orange habanero peppers hanging on the plant for a more natural field-guide look',
    position: 'center 35%',
    creditLabel: 'House habanero plant study',
    creditMeta: 'Generated with gpt-image-1.5 for the HotPepperz project',
  },
  ajiAmarilloBottle: {
    image: 'images/aji-amarillo-sauce.png',
    alt: 'Generated Aji Amarillo hot sauce bottle render with bright yellow peppers on the label',
    position: 'center center',
    presentation: 'product',
    backdrop: 'radial-gradient(circle at top, #fff9ea 0%, #f8d47e 42%, #8b4421 100%)',
  },
  trinidadScorpionBottle: {
    image: 'images/trinidad-scorpion-sauce.png',
    alt: 'Generated Trinidad Scorpion hot sauce bottle render with fiery black-and-red label art',
    position: 'center center',
    presentation: 'product',
    backdrop: 'radial-gradient(circle at top, #fff5e8 0%, #ff9a54 28%, #4b1008 100%)',
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
