import { BrowserRouter, Routes, Route } from "react-router-dom"


import './App.css'
import { Index } from './pages/Index'
import { SearchResults } from './pages/Results'
function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search/:location" element={<SearchResults />} />
        </Routes>
    </BrowserRouter>
 
  )
}

export default App
