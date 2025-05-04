import { PropsWithChildren } from "react";
import { useAuth } from './AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }: PropsWithChildren<{}>) {
  //const { user } = useAuth();
  const {accessToken,isLoading} = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <div>Loading...</div>; // Or any loading component
  }
  

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;