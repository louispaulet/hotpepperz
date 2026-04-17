export const pageThemes = {
  journal: {
    key: 'journal',
    family: 'journal',
    type: 'journal',
    label: 'Field Journal',
    headerCopy: 'Editorial dispatches, featured peppers, and the broader story world of heat.',
    mobileHeaderCopy: 'Editorial dispatches and featured peppers.',
    headerNote: 'Story-led overview with the richest imagery and strongest cinematic atmosphere.',
    ctaHref: '/wiki',
    ctaLabel: 'Open the encyclopedia',
    mobileCtaLabel: 'Encyclopedia',
    backgroundPhotos: {
      left: 'marketCrate',
      right: 'habaneroPlant',
      center: 'fermentedJar',
    },
  },
  'wiki-hub': {
    key: 'wiki-hub',
    family: 'encyclopedia',
    type: 'wiki-hub',
    label: 'Encyclopedia Hub',
    headerCopy: 'Structured directories for peppers, recipes, places, and migration stories.',
    mobileHeaderCopy: 'Directory view for peppers, recipes, places, and legends.',
    headerNote: 'Directory-first browsing with clearer category boundaries and faster orientation.',
    ctaHref: '/wiki/origins',
    ctaLabel: 'Browse the origins atlas',
    mobileCtaLabel: 'Origins atlas',
    backgroundPhotos: {
      left: 'wikiHabanero',
      right: 'marketCrate',
      center: 'heroChili',
    },
  },
  origins: {
    key: 'origins',
    family: 'encyclopedia',
    type: 'origins',
    label: 'Origins Atlas',
    headerCopy: 'Landscape-first reading focused on climate, geography, and growing context.',
    mobileHeaderCopy: 'Landscape-led reading for climate and origin.',
    headerNote: 'Atlas cues, map textures, and horizon-led cards keep this area distinct.',
    ctaHref: '/wiki',
    ctaLabel: 'Open pepper profiles',
    mobileCtaLabel: 'Pepper profiles',
    backgroundPhotos: {
      left: 'habaneroPlant',
      right: 'wikiHabanero',
      center: 'heroChili',
    },
  },
  pairings: {
    key: 'pairings',
    family: 'encyclopedia',
    type: 'pairings',
    label: 'Pairings Notebook',
    headerCopy: 'Kitchen-minded studies showing where peppers belong on the plate.',
    mobileHeaderCopy: 'Kitchen-minded studies for what peppers pair with.',
    headerNote: 'Ingredient-led cues and tasting-card rhythm make the route feel more culinary.',
    ctaHref: '/wiki/heat-pairings',
    ctaLabel: 'Read pairing studies',
    mobileCtaLabel: 'Pairing studies',
    backgroundPhotos: {
      left: 'fermentedJar',
      right: 'marketCrate',
      center: 'bottleLineup',
    },
  },
  'pepper-detail': {
    key: 'pepper-detail',
    family: 'encyclopedia',
    type: 'pepper-detail',
    label: 'Pepper Dossier',
    headerCopy: 'A specimen-style readout for origin, heat, cultivation, and cooking behavior.',
    mobileHeaderCopy: 'Origin, heat, cultivation, and cooking at a glance.',
    headerNote: 'Portrait-forward layout and taxonomy cues make profiles feel like field dossiers.',
    ctaHref: '/wiki/origins',
    ctaLabel: 'Explore origin landscapes',
    mobileCtaLabel: 'Origins',
    backgroundPhotos: {
      left: 'wikiHabanero',
      right: 'habaneroPlant',
      center: 'pepperStillLife',
    },
  },
  'recipe-detail': {
    key: 'recipe-detail',
    family: 'encyclopedia',
    type: 'recipe-detail',
    label: 'Recipe Notebook',
    headerCopy: 'Kitchen notes, pairing logic, and flavor sections arranged like a tasting journal.',
    mobileHeaderCopy: 'Pairing logic and flavor notes in notebook form.',
    headerNote: 'Warmer overlays and notebook-style cards help recipe pages read differently from dossiers.',
    ctaHref: '/wiki/heat-pairings',
    ctaLabel: 'Open pairings index',
    mobileCtaLabel: 'Pairings',
    backgroundPhotos: {
      left: 'fermentedJar',
      right: 'habaneroMacro',
      center: 'bottleLineup',
    },
  },
  'restaurant-detail': {
    key: 'restaurant-detail',
    family: 'encyclopedia',
    type: 'restaurant-detail',
    label: 'Restaurant Spotlight',
    headerCopy: 'A more polished guide feel for where peppers show up in ambitious dining rooms.',
    mobileHeaderCopy: 'Where peppers show up in ambitious dining rooms.',
    headerNote: 'Sleeker accents and plaque-like metadata keep restaurant pages refined and distinct.',
    ctaHref: '/wiki',
    ctaLabel: 'Browse all spotlights',
    mobileCtaLabel: 'Spotlights',
    backgroundPhotos: {
      left: 'bottleLineup',
      right: 'pepperStillLife',
      center: 'heroChili',
    },
  },
  'legend-detail': {
    key: 'legend-detail',
    family: 'encyclopedia',
    type: 'legend-detail',
    label: 'Routes And Legends',
    headerCopy: 'History-led pages about migration, trade, adaptation, and pepper culture.',
    mobileHeaderCopy: 'History, migration, and pepper culture.',
    headerNote: 'Archival textures and route-line cues shift the tone from directory to essay.',
    ctaHref: '/wiki',
    ctaLabel: 'Return to the atlas',
    mobileCtaLabel: 'Atlas',
    backgroundPhotos: {
      left: 'pepperStillLife',
      right: 'heroChili',
      center: 'wikiHabanero',
    },
  },
  lab: {
    key: 'lab',
    family: 'workshop',
    type: 'lab',
    label: 'Sauce Workshop',
    headerCopy: 'A workbench for balancing peppers, accents, heat, and packaging direction.',
    mobileHeaderCopy: 'Balance peppers, accents, heat, and packaging.',
    headerNote: 'Sharper contrast and bench-style cues keep the workshop focused, practical, and easy to read.',
    ctaHref: '/lab',
    ctaLabel: 'Build a bottle',
    mobileCtaLabel: 'Build',
    backgroundPhotos: {
      left: 'bottleLineup',
      right: 'fermentedJar',
      center: 'marketCrate',
    },
  },
  legal: {
    key: 'legal',
    family: 'legal',
    type: 'legal',
    label: 'Legal Desk',
    headerCopy: 'Calmer document styling for compliance drafts, notices, and policy reading.',
    mobileHeaderCopy: 'Calmer reading for notices, policies, and compliance drafts.',
    headerNote: 'Reduced ambient noise and clearer document hierarchy keep these pages easier to scan.',
    ctaHref: '/wiki',
    ctaLabel: 'Return to encyclopedia',
    mobileCtaLabel: 'Encyclopedia',
    backgroundPhotos: {
      left: 'pepperStillLife',
      right: 'wikiHabanero',
      center: 'heroChili',
    },
  },
}

export function getPageTheme(pathname) {
  if (pathname === '/') return pageThemes.journal
  if (pathname === '/wiki') return pageThemes['wiki-hub']
  if (pathname.startsWith('/wiki/origins')) return pageThemes.origins
  if (pathname.startsWith('/wiki/heat-pairings')) return pageThemes.pairings
  if (pathname.startsWith('/wiki/peppers/')) return pageThemes['pepper-detail']
  if (pathname.startsWith('/wiki/recipes/')) return pageThemes['recipe-detail']
  if (pathname.startsWith('/wiki/restaurants/')) return pageThemes['restaurant-detail']
  if (pathname.startsWith('/wiki/legends/')) return pageThemes['legend-detail']
  if (pathname.startsWith('/lab')) return pageThemes.lab
  if (pathname.startsWith('/legal/')) return pageThemes.legal

  return pageThemes.journal
}
