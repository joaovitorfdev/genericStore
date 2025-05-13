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
const adminRoutes = ['/dashboard/*']

interface AuthContextType {
  accessToken: string | null
  refreshToken: string | null
  user: UserDTO | null
  isAdmin:Boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void,
  fetchCustomerData: () => void
  // você pode expor fetchWithAuth, refreshTokens, etc., se quiser
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  user: null,
  isAdmin:false,
  login: async () => false,
  logout: () => {},
  fetchCustomerData: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [user, setUser] = useState<UserDTO | null>(null)
  const [isAdmin, setIsAdmin] = useState<Boolean>(false)
  const [authResolved, setAuthResolved] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {

   (async () => {
       await fetchCustomerData()
    })()
  }, [accessToken])

  useEffect(() => {
    if (!authResolved) return; // espera a autenticação carregar
  
    // Helper que checa se o pathname bate com alguma rota da lista
    const match = (routes: string[]) =>
      routes.some((route) =>
        route.endsWith("/*")
          ? pathname.startsWith(route.slice(0, -2))
          : pathname === route
      );
  
    const isPublicPath = match(publicRoutes);
    const isCustomerPath = match(customerRoutes);
    const isAdminPath = match(adminRoutes);


    if (isPublicPath) {
      return;
    }
  
    // Se não está logado e a rota não é pública, manda pra login
    if (!user) {
      router.push("/login");
      return;
    }
  
    if (isCustomerPath && !user) {
      router.push("/");
      return;
    }

  if (isAdminPath && !isAdmin) {
      router.push("/");
      return;
    }
 
  
    if (!isCustomerPath && !isAdminPath) {
      router.push("/");
    }
  }, [pathname, authResolved, user, router]);

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
      setIsAdmin(data.groups.some((gp => gp.name === "Admin")))
      console.log(isAdmin)
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
    <AuthContext.Provider value={{ accessToken, refreshToken, user, isAdmin, login, logout, fetchCustomerData }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
