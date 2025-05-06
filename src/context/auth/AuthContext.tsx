'use client'

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { UserDTO } from '@/app/types/customer/validators/CustomerDTO'
import { fetchWithAuth } from '@/app/(public)/services/cartService'

const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

// Defina aqui as rotas públicas e de cliente
const publicRoutes = ['/login', '/register', '/shop/*' , '/']
const customerRoutes = ['/checkout/*', '/customer/*']

interface AuthContextType {
  accessToken: string | null
  refreshToken: string | null
  user: UserDTO | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void,
  fetchCustomerData: () => void
  // você pode expor fetchWithAuth, refreshTokens, etc., se quiser
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  user: null,
  login: async () => false,
  logout: () => {},
  fetchCustomerData: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [user, setUser] = useState<UserDTO | null>(null)
  const [authResolved, setAuthResolved] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {

   (async () => {
       await fetchCustomerData()
    })()
  }, [accessToken])

  useEffect(() => {
    if (!authResolved) return;

    const match = (list: string[]) =>
      list.some((route) =>
        route.endsWith('/*')
          ? pathname.startsWith(route.slice(0, -2))
          : pathname === route
      );

    const isPublic = match(publicRoutes);
    const isCustomer = match(customerRoutes);
    console.log("user", user)

    if (!user && !isPublic) {
      console.log(user)

      router.push('/login');
      return;
    }
    if (!user && !isPublic && !isCustomer) {
      console.log(user)
      router.push('/');
      return;
    }
  }, [pathname, router]);


  const login = async (username: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/token/pair`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) return false
      const data = await res.json()
      setAccessToken(data.access)
      setRefreshToken(data.refresh)
      localStorage.setItem('accessToken', data.access)
      localStorage.setItem('refreshToken', data.refresh)
      return true
    } catch {
      return false
    }
  }


  const fetchCustomerData = async (): Promise<void> => {
    setAuthResolved(true)

    const sa = localStorage.getItem('accessToken')
    const sr = localStorage.getItem('refreshToken')
    if (sa) setAccessToken(sa)
    if (sr) setRefreshToken(sr)

    if (!accessToken) {
      setUser(null)
      return
    }
    try {
      
      const res = await fetchWithAuth(`${API_URL}/customer/me`);
      if (!res.ok) {
       return
      }
      const data: UserDTO = await res.json();
      setUser(data);
      const sa = localStorage.getItem('accessToken')
      const sr = localStorage.getItem('refreshToken')
      if (sa) setAccessToken(sa)
      if (sr) setRefreshToken(sr)
        
    } catch (err) {
      console.error(err);
    }
    setAuthResolved(true)

  };

  
  const logout = () => {
    setAccessToken(null)
    setRefreshToken(null)
    setUser(null)
    localStorage.clear()
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, user, login, logout, fetchCustomerData }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
