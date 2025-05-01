import { BrowserRouter, Routes, Route } from "react-router-dom"


import './App.css'
import { Index } from './pages/Index'
import { SearchResults } from './pages/Results'
import LandingPage from "./pages/LandingPage"
import LoginForm from "./components/auth_form"
import { AuthProvider } from './context/AuthContext';
import RequireAuth from "./context/RequireAuth"

function App() {

  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={   <LandingPage />} />
              <Route path="/index" element ={<RequireAuth><Index/></RequireAuth> }/>
              <Route path="/search/:location" element={ <RequireAuth> <SearchResults isSample={false}/></RequireAuth>  } />
              <Route path="/login" element={<LoginForm />} /> 
              <Route path="/sampleSearchLocation" element={<SearchResults isSample={true} />} /> {/* <-- Add this */}


          </Routes>
      </BrowserRouter>

    </AuthProvider>
   
 
  )
}

export default App
