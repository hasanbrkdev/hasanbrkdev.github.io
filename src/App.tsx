import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

const ResumePage = lazy(() => import('./pages/ResumePage'))

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/resume"
          element={
            <Suspense fallback={<div className="min-h-screen bg-night" />}>
              <ResumePage />
            </Suspense>
          }
        />
      </Routes>
    </HashRouter>
  )
}
