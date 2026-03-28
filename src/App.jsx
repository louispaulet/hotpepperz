import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LabPage from './pages/LabPage'
import SiteFrame from './components/SiteFrame'

function App() {
  return (
    <div className="site-shell text-stone-100">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-12rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.42),_transparent_72%)] blur-2xl" />
        <div className="absolute right-[-10rem] top-[18rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(220,38,38,0.3),_transparent_72%)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-[-12rem] mx-auto h-[30rem] w-[72rem] max-w-full bg-[radial-gradient(circle,_rgba(249,115,22,0.18),_transparent_68%)] blur-3xl" />
      </div>

      <div className="grain-overlay" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-16 pt-5 sm:px-8 lg:px-10">
        <SiteFrame>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lab" element={<LabPage />} />
          </Routes>
        </SiteFrame>
      </div>
    </div>
  )
}

export default App
