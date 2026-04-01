import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LabPage from './pages/LabPage'
import WikiPage from './pages/WikiPage'
import SiteFrame from './components/SiteFrame'
import { editorialImages } from './lib/media'

function App() {
  const baseUrl = import.meta.env.BASE_URL

  return (
    <div className="site-shell text-stone-100">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        <div className="hero-glow hero-glow-bottom" />
        <div className="hero-glow hero-glow-top" />
        <div
          className="ambient-photo ambient-photo-left"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(9, 8, 7, 0.22), rgba(9, 8, 7, 0.96)), url(${baseUrl}${editorialImages.marketCrate.image})`,
          }}
        />
        <div
          className="ambient-photo ambient-photo-right"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(11, 8, 7, 0.16), rgba(11, 8, 7, 0.94)), url(${baseUrl}${editorialImages.habaneroPlant.image})`,
          }}
        />
        <div
          className="ambient-photo ambient-photo-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(11, 8, 7, 0.14), rgba(11, 8, 7, 0.94)), url(${baseUrl}${editorialImages.fermentedJar.image})`,
          }}
        />
        <div className="site-grid" />
        <div className="site-lines" />
      </div>

      <div className="grain-overlay" />

      <div className="mx-auto flex min-h-screen w-full max-w-[110rem] flex-col px-3 pb-5 pt-3 sm:px-5 lg:px-6 xl:pb-6 xl:pt-4">
        <SiteFrame>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lab" element={<LabPage />} />
            <Route path="/wiki" element={<WikiPage />} />
          </Routes>
        </SiteFrame>
      </div>
    </div>
  )
}

export default App
