import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LabPage from './pages/LabPage'
import WikiPage from './pages/WikiPage'
import SiteFrame from './components/SiteFrame'

function App() {
  return (
    <div className="site-shell text-stone-100">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        <div className="hero-glow hero-glow-bottom" />
        <div className="site-grid" />
      </div>

      <div className="grain-overlay" />

      <div className="mx-auto flex min-h-screen w-full max-w-[96rem] flex-col px-4 pb-16 pt-5 sm:px-6 lg:px-8">
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
