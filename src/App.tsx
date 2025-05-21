import { BrowserRouter, Routes, Route } from "react-router-dom"


import './App.css'
// import { SearchResults } from './pages/Results'
import LandingPage from "./pages/LandingPage"
import LoginForm from "./components/auth_form"
import { AuthProvider } from './context/AuthContext';
import RequireAuth from "./context/RequireAuth"
import EmailConfirmation from "./pages/ConfirmEmail"
import { Toaster } from "./components/ui/toaster"
import PasswordReset from "./pages/ResetPassword"
import { SendPasswordReset } from "./pages/SendPasswordReset"
import IndexSideBar from "./components/SideBars/IndexSideBar"
import SearchResultsSideBar from "./components/SideBars/SearchResultsSideBarComponent"

function App() {

  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={   <LandingPage />} />
              <Route path="/index" element ={<RequireAuth>  <IndexSideBar/> </RequireAuth> }/>
              <Route path="/search/:location" element={ <RequireAuth> <SearchResultsSideBar isSample={false}/></RequireAuth>  } />
              <Route path="/userQueryById/:id" element={ <RequireAuth>  <SearchResultsSideBar isSample = {false}/>  </RequireAuth>} />

              <Route path="/login" element={<LoginForm />} /> 
              {/* <Route path="/sampleSearchLocation" element={<SearchResults isSample={true} />} /> <-- Add this */}
              {/* <Route path="/userQueryById/:id" element={ <RequireAuth>  <SearchResults isSample={false} />  </RequireAuth>} /> */}
              <Route path="/userQueryById/:id" element={ <RequireAuth>  <SearchResultsSideBar isSample = {false} />  </RequireAuth>} />

              <Route path="/confirmEmail/:userId/:code" element={  <EmailConfirmation/>  } />
              <Route path="/resetPassword/:email/:code" element={  <PasswordReset/>  } />
              <Route path="/sendPasswordReset" element={  <SendPasswordReset/>  } />



          </Routes>
      </BrowserRouter>
      <Toaster/>

      

    </AuthProvider>
   
 
  )
}

export default App




