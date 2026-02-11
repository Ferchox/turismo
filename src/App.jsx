import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Destination from './pages/Destination'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="destination/:id" element={<Destination />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
