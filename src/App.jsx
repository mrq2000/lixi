import { Routes, Route } from 'react-router-dom'
import SetupPage from './pages/SetupPage'
import DrawPage from './pages/DrawPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<SetupPage />} />
        <Route path="/draw" element={<DrawPage />} />
      </Routes>
    </div>
  )
}

export default App

