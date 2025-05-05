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

  // 1) Carrega tokens do localStorage só uma vez
  useEffect(() => {
    const sa = localStorage.getItem('accessToken')
    const sr = localStorage.getItem('refreshToken')
    if (sa) setAccessToken(sa)
    if (sr) setRefreshToken(sr)
    setAuthResolved(true)
  }, [])

  useEffect(() => {
    if (!accessToken) {
      setUser(null)
      return
    }
    ;(async () => {
      try {
        fetchCustomerData()
      } catch {
        setUser(null)
      }
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

    // visitante tentando rota privada → login
    if (!user && !isPublic) {
      router.push('/login');
      return;
    }
    // cliente logado em rota não permitida → home
    if (user && !isPublic && !isCustomer) {
      router.push('/');
      return;
    }
  }, [authResolved, user, pathname, router]);


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
    try {
      const res = await fetchWithAuth(`${API_URL}/customer/me`);
      if (!res.ok) {
        throw new Error("Erro ao buscar dados do cliente");
      }
      const data: UserDTO = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    }
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
