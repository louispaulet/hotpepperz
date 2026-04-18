import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import LabPage from './pages/LabPage'
import WikiPage from './pages/WikiPage'
import PepperDetailPage from './pages/PepperDetailPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import RestaurantDetailPage from './pages/RestaurantDetailPage'
import LegendDetailPage from './pages/LegendDetailPage'
import LegalPage from './pages/LegalPage'
import OriginsAtlasPage from './pages/OriginsAtlasPage'
import HeatPairingsPage from './pages/HeatPairingsPage'
import SiteFrame from './components/SiteFrame'
import { editorialImages } from './lib/media'
import { getPageTheme } from './lib/pageThemes'

function App() {
  const baseUrl = import.meta.env.BASE_URL
  const location = useLocation()
  const pageTheme = getPageTheme(location.pathname)
  // Ensure the page starts at the top on route changes
  useEffect(() => {
    // Scroll to top when the path or query changes
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.search])
  const ambientMedia = {
    left: editorialImages[pageTheme.backgroundPhotos.left],
    right: editorialImages[pageTheme.backgroundPhotos.right],
    center: editorialImages[pageTheme.backgroundPhotos.center],
  }

  return (
    <div
      className="site-shell text-stone-100"
      data-page-family={pageTheme.family}
      data-page-type={pageTheme.type}
    >
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        <div className="hero-glow hero-glow-bottom" />
        <div className="hero-glow hero-glow-top" />
        <div
          className="ambient-photo ambient-photo-left"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(9, 8, 7, 0.22), rgba(9, 8, 7, 0.96)), url(${baseUrl}${ambientMedia.left.image})`,
          }}
        />
        <div
          className="ambient-photo ambient-photo-right"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(11, 8, 7, 0.16), rgba(11, 8, 7, 0.94)), url(${baseUrl}${ambientMedia.right.image})`,
          }}
        />
        <div
          className="ambient-photo ambient-photo-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(11, 8, 7, 0.14), rgba(11, 8, 7, 0.94)), url(${baseUrl}${ambientMedia.center.image})`,
          }}
        />
        <div className="site-grid" />
        <div className="site-lines" />
      </div>

      <div className="grain-overlay" />

      <div className="mx-auto flex min-h-screen w-full max-w-[110rem] flex-col px-3 pb-5 pt-3 sm:px-5 lg:px-6 xl:pb-6 xl:pt-4">
        <SiteFrame theme={pageTheme}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lab" element={<LabPage />} />
            <Route path="/wiki" element={<WikiPage />} />
            <Route path="/wiki/origins" element={<OriginsAtlasPage />} />
            <Route path="/wiki/heat-pairings" element={<HeatPairingsPage />} />
            <Route path="/wiki/peppers/:slug" element={<PepperDetailPage />} />
            <Route path="/wiki/recipes/:slug" element={<RecipeDetailPage />} />
            <Route path="/wiki/restaurants/:slug" element={<RestaurantDetailPage />} />
            <Route path="/wiki/legends/:slug" element={<LegendDetailPage />} />
            <Route path="/legal/:slug" element={<LegalPage />} />
          </Routes>
        </SiteFrame>
      </div>
    </div>
  )
}

export default App
