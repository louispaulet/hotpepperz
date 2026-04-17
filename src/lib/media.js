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

export const pepperImageAssociations = {
  'birds-eye-chili': {
    portraitVisual: {
      image: editorialImages.heroChili.image,
      alt: 'Single vivid red chili used as the Bird’s Eye chili portrait image',
      position: 'center center',
      prompt:
        "existing house raster image reused for Bird's Eye chili portrait",
    },
    landscapeVisual: {
      image: editorialImages.marketCrate.image,
      alt: 'Overflowing market pepper display reused as a vivid Bird’s Eye chili landscape backdrop',
      position: editorialImages.marketCrate.position,
      prompt:
        'existing house raster image reused as Bird’s Eye chili backdrop',
    },
  },
  'piri-piri': {
    portraitVisual: {
      image: 'images/cayenne.png',
      alt: 'Slender red pepper image reused as the Piri Piri portrait',
      position: 'center 42%',
      prompt:
        'existing house raster image reused for Piri Piri portrait',
    },
    landscapeVisual: {
      image: editorialImages.habaneroPlant.image,
      alt: 'Pepper plant image reused as a natural growing backdrop for Piri Piri',
      position: editorialImages.habaneroPlant.position,
      prompt:
        'existing house raster image reused as Piri Piri growing backdrop',
    },
  },
  rocoto: {
    portraitVisual: {
      image: editorialImages.pepperStillLife.image,
      alt: 'Dramatic pepper still life reused as the Rocoto portrait visual',
      position: editorialImages.pepperStillLife.position,
      prompt:
        'existing house raster image reused for Rocoto portrait',
    },
    landscapeVisual: {
      image: 'images/landscapes/rocoto-landscape.svg',
      alt: 'Andean terrace landscape showing cool highland pepper cultivation',
      position: 'center center',
      prompt:
        'Andean terrace pepper landscape, high-altitude farms, mountain light, editorial atlas illustration',
    },
  },
  'chile-de-arbol': {
    portraitVisual: {
      image: 'images/cayenne.png',
      alt: 'Slender red pepper image reused as the Chile de Arbol portrait',
      position: 'center 42%',
      prompt:
        'existing house raster image reused for Chile de Arbol portrait',
    },
    landscapeVisual: {
      image: editorialImages.marketCrate.image,
      alt: 'Market pepper scene reused as the Chile de Arbol backdrop',
      position: editorialImages.marketCrate.position,
      prompt:
        'existing house raster image reused as Chile de Arbol backdrop',
    },
  },
  'madame-jeanette': {
    portraitVisual: {
      image: 'images/scotch-bonnet.png',
      alt: 'Scotch bonnet image reused as the Madame Jeanette portrait',
      position: 'center 30%',
      prompt:
        'existing house raster image reused for Madame Jeanette portrait',
    },
    landscapeVisual: {
      image: editorialImages.habaneroPlant.image,
      alt: 'Natural pepper plant image reused as the Madame Jeanette growing backdrop',
      position: editorialImages.habaneroPlant.position,
      prompt:
        'existing house raster image reused as Madame Jeanette growing backdrop',
    },
  },
  datil: {
    portraitVisual: {
      image: 'images/aji-amarillo.png',
      alt: 'Yellow pepper image reused as the Datil portrait',
      position: 'center center',
      prompt:
        'existing house raster image reused for Datil portrait',
    },
    landscapeVisual: {
      image: editorialImages.habaneroPlant.image,
      alt: 'Pepper plant image reused as the Datil growing backdrop',
      position: editorialImages.habaneroPlant.position,
      prompt:
        'existing house raster image reused as Datil growing backdrop',
    },
  },
  cheongyang: {
    portraitVisual: {
      image: 'images/serrano-peppers.png',
      alt: 'Serrano pepper image reused as the Cheongyang portrait',
      position: 'center center',
      prompt:
        'existing house raster image reused for Cheongyang portrait',
    },
    landscapeVisual: {
      image: editorialImages.marketCrate.image,
      alt: 'Market pepper image reused as the Cheongyang backdrop',
      position: editorialImages.marketCrate.position,
      prompt:
        'existing house raster image reused as Cheongyang backdrop',
    },
  },
  fatalii: {
    portraitVisual: {
      image: 'images/aji-amarillo.png',
      alt: 'Yellow pepper image reused as the Fatalii portrait',
      position: 'center center',
      prompt:
        'existing house raster image reused for Fatalii portrait',
    },
    landscapeVisual: {
      image: editorialImages.habaneroPlant.image,
      alt: 'Pepper plant image reused as the Fatalii growing backdrop',
      position: editorialImages.habaneroPlant.position,
      prompt:
        'existing house raster image reused as Fatalii growing backdrop',
    },
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

export function getPepperAssociation(slug) {
  return pepperImageAssociations[slug]
}

export function resolveImageSrc(baseUrl, image) {
  return image.startsWith('http') ? image : `${baseUrl}${image}`
}
