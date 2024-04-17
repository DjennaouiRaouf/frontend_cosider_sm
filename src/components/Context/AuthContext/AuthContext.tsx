import {createContext, ReactNode, useEffect, useState} from 'react'
import Cookies from "js-cookie";


type Props = {
  children?: ReactNode;
}

type IAuthContext = {
  authenticated: any;
  setAuthenticated: (newState: any) => void
}

const initialValue = {
  authenticated: Cookies.get("token"),
  setAuthenticated: () => {}
}

const AuthContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({children}: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [ authenticated, setAuthenticated ] = useState(initialValue.authenticated)
  useEffect(() => {
    const checkCookie = () => {
      const isCookieSet = Cookies.get('token');
      if(!isCookieSet){
        Cookies.remove('role')
      }
      setAuthenticated(isCookieSet);
    };
    checkCookie();
    const intervalId = setInterval(checkCookie, 1000);
    return () => clearInterval(intervalId);
  }, []);


  return (
      <AuthContext.Provider value={{authenticated, setAuthenticated}}>
        {children}
      </AuthContext.Provider>
  )
}

export {  AuthContext, AuthProvider }