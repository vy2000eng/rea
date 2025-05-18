// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
 //user: any;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string,username:string) => Promise<void>;

  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  isLoading: boolean;
  setAccessToken:(token:string)=>void;
  setRefreshToken:(token:string)=>void;

}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  //const [user, setUser] = useState(null);
  //const {toast} = useToast
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add this line


  // Initialize from localStorage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedRefresh = localStorage.getItem('refreshToken');
    //const storedUser = localStorage.getItem('user');
  
    if (storedToken) {
      try {
        setAccessToken(storedToken);
        setRefreshToken(storedRefresh);
       // setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
       // setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        // Optionally clear corrupted data
        //localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${import.meta.env.VITE_LOGIN_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
     // localStorage.setItem('user', JSON.stringify(data.user));
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      console.log(data.accessToken);
      console.log(data.refreshToken);
    } else {
      throw new Error(data.message);
    }
  };
  const register = async (email:string, username:string, password:string) =>{
   /// try{

      const response = await fetch(`${import.meta.env.VITE_REGISTER_ENDPOINT}` , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username,password }),
      });
      if(response.ok){
        await login(email, password);
       // await login(email, password);
      }
      throw ("please try a different email, or address")

  }


  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    //localStorage.removeItem('user');
    setAccessToken(null);
    setRefreshToken(null);
   // setUser(null);
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REFRESH_ENDPOINT}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        setAccessToken(data.accessToken);
        
        // If using token rotation
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
          setRefreshToken(data.refreshToken);
        }
      } else {
        logout();
      }
    } catch (error) {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ 
      //user,
      accessToken, login,register, logout, isLoading, refreshAccessToken,setAccessToken,setRefreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
