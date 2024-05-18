import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { loginUser } from "../helpers/api-communicator";


type User = {
    name: string,
    email: string
}

type UserAuth = {
    isLogedIn: boolean,
    user: User | null,
    login: (email: string, password: string) => Promise<void>
    signup: (name: string, email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<UserAuth|null>(null)

const AuthProvider = ({children}: {children: ReactNode}) => {

  const [user, setUser] = useState<User | null>(null)
  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(()=>{
    // fetch if the user's cookies are valid then skip Login
  },[])
  
  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    console.log(data);
    if (data) {
      setUser({ email: data.email, name: data.username });
      setIsLogedIn(true);
    }
  };

  const signup = async(name: string, email: string, password: string) =>{}


  const logout = async() =>{}

  const value = {
    user,
    isLogedIn,
    login,
    signup,
    logout
  }

  return <AuthContext.Provider value={value}>
     {children}
  </AuthContext.Provider>

}

const useAuth = () => useContext(AuthContext)

export {AuthProvider,useAuth}