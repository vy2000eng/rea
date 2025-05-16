import { PropsWithChildren } from "react";
import { useAuth } from './AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }: PropsWithChildren<{}>) {
  //const { user } = useAuth();
  const {accessToken,isLoading,setAccessToken, setRefreshToken} = useAuth();

  const isGoogleLogin = () => {
    const params = new URLSearchParams(window.location.search);
    const encodedAccessToken = params.get('access_token');
    const encodedRefreshToken = params.get('refresh_token');
    
    if (encodedAccessToken && encodedRefreshToken) {
      // Store both tokens

      const accessToken = decodeURIComponent(encodedAccessToken);
      const refreshToken = decodeURIComponent(encodedRefreshToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      const access_token = localStorage.getItem('accessToken')
      const refresh_token = localStorage.getItem('refreshToken')
      if(access_token != null && refresh_token!= null){
        setAccessToken(access_token);
        setRefreshToken(refresh_token)
      }

 
      
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    

    }
  }
  isGoogleLogin()




  const location = useLocation();
  console.log(location.pathname)
  if (isLoading) {
    return <div>Loading...</div>; // Or any loading component
  }
  

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;