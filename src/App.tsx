import { BrowserRouter, Routes, Route } from "react-router-dom"


import './App.css'
import { SearchResults } from './pages/Results'
import LandingPage from "./pages/LandingPage"
import LoginForm from "./components/auth_form"
import { AuthProvider } from './context/AuthContext';
import RequireAuth from "./context/RequireAuth"
import Sidebar from "./components/sidebar"

function App() {

  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={   <LandingPage />} />
              <Route path="/index" element ={<RequireAuth>  <Sidebar/> </RequireAuth> }/>
              <Route path="/search/:location" element={ <RequireAuth> <SearchResults isSample={false}/></RequireAuth>  } />
              <Route path="/login" element={<LoginForm />} /> 
              <Route path="/sampleSearchLocation" element={<SearchResults isSample={true} />} /> {/* <-- Add this */}
              <Route path="/userQueryById/:id" element={ <RequireAuth> <SearchResults isSample={false} />  </RequireAuth>} />
              
          </Routes>
      </BrowserRouter>

    </AuthProvider>
   
 
  )
}

export default App
