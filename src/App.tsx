import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ResumePage from './pages/ResumePage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </HashRouter>
  )
}
