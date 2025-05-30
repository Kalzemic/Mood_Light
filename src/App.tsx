// App.tsx
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './Components/Homapage'
import Navbar from './Components/Navbar'
import DesignPage from './Components/DesignPage'

function App() {
  return (
    <BrowserRouter>
      {/* Fixed full-screen background image */}

      <Navbar />

      <div className="main-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Design" element={<div className="page-content"><DesignPage /></div>} />
          <Route path="/Custom" element={<DesignPage />} />
          <Route path="/Contact" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
