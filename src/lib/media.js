export const editorialImages = {
  bottleLineup: {
    image: 'images/assorted-hot-sauce-bottles.jpg',
    alt: 'Assorted hot sauce bottles, lemons, and tabletop styling in a premium editorial composition',
    creditLabel: 'Assorted Hot Sauce Bottles',
    creditHref: 'https://www.pexels.com/photo/assorted-hot-sauce-bottles-1124038/',
    creditMeta: 'Photo by iSAW Company on Pexels',
  },
  pepperStillLife: {
    image: 'images/peppers-dark-still-life.jpg',
    alt: 'Red, yellow, and orange peppers arranged on a dark tabletop with dramatic food styling',
    creditLabel: 'Three Yellow, Red and Orange Bell Peppers on Brown Surface',
    creditHref: 'https://www.pexels.com/photo/three-yellow-red-and-orange-bell-peppers-on-brown-surface-7017/',
    creditMeta: 'Photo by Snapwire on Pexels',
  },
  habaneroMacro: {
    image: 'images/habanero-closeup-edit2.jpg',
    alt: 'Close-up orange habanero pepper with crisp texture detail',
    creditLabel: 'Habanero closeup edit2.jpg',
    creditHref: 'https://commons.wikimedia.org/wiki/File:Habanero_closeup_edit2.jpg',
    creditMeta: 'Ryan Bushby via Wikimedia Commons, CC BY 2.5',
  },
  nagaCluster: {
    image: 'images/naga-jolokia-peppers.jpg',
    alt: 'Cluster of wrinkled Naga Jolokia peppers photographed as a superhot reference',
    creditLabel: 'Naga Jolokia Peppers.jpg',
    creditHref: 'https://commons.wikimedia.org/wiki/File:Naga_Jolokia_Peppers.jpg',
    creditMeta: 'Wikimedia Commons source',
  },
}

export const featuredImageCredits = Object.values(editorialImages).map((image) => ({
  label: image.creditLabel,
  href: image.creditHref,
  meta: image.creditMeta,
}))

export function resolveImageSrc(baseUrl, image) {
  return image.startsWith('http') ? image : `${baseUrl}${image}`
}
