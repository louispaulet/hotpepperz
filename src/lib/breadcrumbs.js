export function getBreadcrumbs(pathname, entity = null) {
  if (pathname === '/') return []
  if (pathname === '/wiki') return [{ label: 'Home', to: '/' }, { label: 'Encyclopedia' }]
  if (pathname.startsWith('/wiki/origins')) {
    return [
      { label: 'Home', to: '/' },
      { label: 'Encyclopedia', to: '/wiki' },
      { label: 'Origins Atlas' },
    ]
  }
  if (pathname.startsWith('/wiki/heat-pairings')) {
    return [
      { label: 'Home', to: '/' },
      { label: 'Encyclopedia', to: '/wiki' },
      { label: 'Heat Pairings' },
    ]
  }
  if (pathname.startsWith('/wiki/peppers/')) {
    return [
      { label: 'Home', to: '/' },
      { label: 'Encyclopedia', to: '/wiki' },
      { label: 'Pepper Profiles', to: '/wiki' },
      { label: entity?.name ?? 'Pepper' },
    ]
  }
  if (pathname.startsWith('/wiki/recipes/')) {
    return [
      { label: 'Home', to: '/' },
      { label: 'Encyclopedia', to: '/wiki' },
      { label: 'Pairings And Recipes', to: '/wiki/heat-pairings' },
      { label: entity?.title ?? 'Recipe' },
    ]
  }
  if (pathname.startsWith('/wiki/restaurants/')) {
    return [
      { label: 'Home', to: '/' },
      { label: 'Encyclopedia', to: '/wiki' },
      { label: 'Restaurant Spotlights', to: '/wiki' },
      { label: entity?.name ?? 'Restaurant' },
    ]
  }
  if (pathname.startsWith('/wiki/legends/')) {
    return [
      { label: 'Home', to: '/' },
      { label: 'Encyclopedia', to: '/wiki' },
      { label: 'Legends', to: '/wiki' },
      { label: entity?.title ?? 'Legend' },
    ]
  }
  if (pathname.startsWith('/legal/')) {
    return [
      { label: 'Home', to: '/' },
      { label: 'Legal Desk', to: '/legal/legal-notice' },
      { label: entity?.title ?? 'Legal Page' },
    ]
  }
  if (pathname.startsWith('/lab')) {
    return [{ label: 'Home', to: '/' }, { label: 'Workshop' }]
  }

  return [{ label: 'Home', to: '/' }]
}
