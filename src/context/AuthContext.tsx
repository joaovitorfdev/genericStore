'use client'
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { UserDTO } from '@/app/types/customer/validators/CustomerDTO';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  refreshTokenExpiresAt: number | null;
  user: UserDTO | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
  fetchCustomerData: () => Promise<void>;
  refreshTokens: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  refreshTokenExpiresAt: null,
  user: null,
  login: async () => false,
  logout: () => {},
  fetchWithAuth: async () => {
    throw new Error('fetchWithAuth not implemented');
  },
  fetchCustomerData: async () => {
    throw new Error('fetchCustomerData not implemented');
  },
  refreshTokens: async () => {
    throw new Error('refreshTokens not implemented');
  }
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [refreshTokenExpiresAt, setRefreshTokenExpiresAt] = useState<number | null>(null);
  const [user, setUser] = useState<UserDTO | null>(null);

  // Primeiro useEffect: carrega os dados armazenados no localStorage
  useEffect(() => {
    const storedAccess = localStorage.getItem('accessToken');
    const storedRefresh = localStorage.getItem('refreshToken');
    const storedExpiresAt = localStorage.getItem('expiresAt');
    const storedRefreshExpiresAt = localStorage.getItem('refreshTokenExpiresAt');

    if (storedAccess) {
      setAccessToken(storedAccess);
      if (storedRefresh) setRefreshToken(storedRefresh);
      if (storedExpiresAt) setExpiresAt(parseInt(storedExpiresAt));
      if (storedRefreshExpiresAt) setRefreshTokenExpiresAt(parseInt(storedRefreshExpiresAt));
    }
  }, []);

  // Segundo useEffect: quando o accessToken é definido (ou atualizado), busca os dados do usuário
  useEffect(() => {
    if (accessToken) {
      fetchCustomerData();
    }
  }, [accessToken]);

  // Método para incluir o token na requisição
  const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const headers = new Headers(options.headers || {});
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    const opts = { ...options, headers };
    return fetch(url, opts);
  };

  // Busca os dados do usuário (customer)
  const fetchCustomerData = async (): Promise<void> => {
    try {
      const res = await fetchWithAuth("http://localhost:8000/api/customer/me");
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Erro ao buscar dados do cliente. Status: ${res.status}. Mensagem: ${errorText}`);
        throw new Error("Erro ao buscar dados do cliente");
      }
      const data: UserDTO = await res.json();
      console.log("Dados do cliente:", data);
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Função auxiliar para refresh do token
  const refreshAccessToken = async (currentAccessToken: string, currentRefreshToken: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    const response = await fetch(`${API_URL}/token/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: currentRefreshToken })
    });
    const refreshTokenResponse = await response.json();
    if (!response.ok) {
      throw refreshTokenResponse;
    }
    const accessTokenExpiresSeconds = parseInt(process.env.NEXT_PUBLIC_TOKEN_EXPIRES_AT || "1800");
    const refreshTokenExpiresSeconds = parseInt(process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_AT || "86400");

    return {
      accessToken: refreshTokenResponse.access,
      refreshToken: refreshTokenResponse.refresh,
      expiresAt: Math.floor(Date.now() / 1000 + accessTokenExpiresSeconds),
      refreshTokenExpiresAt: Math.floor(Date.now() / 1000 + refreshTokenExpiresSeconds)
    };
  };

  // Método que realiza o refresh dos tokens
  const refreshTokens = async (): Promise<void> => {
    if (!accessToken || !refreshToken) return;
    try {
      const newTokenData = await refreshAccessToken(accessToken, refreshToken);
      setAccessToken(newTokenData.accessToken);
      setRefreshToken(newTokenData.refreshToken);
      setExpiresAt(newTokenData.expiresAt);
      setRefreshTokenExpiresAt(newTokenData.refreshTokenExpiresAt);
      localStorage.setItem('accessToken', newTokenData.accessToken);
      localStorage.setItem('refreshToken', newTokenData.refreshToken);
      localStorage.setItem('expiresAt', newTokenData.expiresAt.toString());
      localStorage.setItem('refreshTokenExpiresAt', newTokenData.refreshTokenExpiresAt.toString());
    } catch (error) {
      console.error("Erro ao atualizar tokens:", error);
      logout();
    }
  };

  // Função de login – ajusta também os tempos de expiração
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const API_URL = "http://localhost:8000/api/token/pair";
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        console.error('Erro ao fazer login:', response.statusText);
        return false;
      }
      const data = await response.json();
      const accessTokenExpiresSeconds = parseInt(process.env.NEXT_PUBLIC_TOKEN_EXPIRES_AT || "1800");
      const refreshTokenExpiresSeconds = parseInt(process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_AT || "86400");

      if (data && data.access && data.refresh && data.username) {
        const newExpiresAt = data.expiresAt || Math.floor(Date.now() / 1000 + accessTokenExpiresSeconds);
        const newRefreshTokenExpiresAt = data.refreshTokenExpiresAt || Math.floor(Date.now() / 1000 + refreshTokenExpiresSeconds);

        setAccessToken(data.access);
        setRefreshToken(data.refresh);
        setExpiresAt(newExpiresAt);
        setRefreshTokenExpiresAt(newRefreshTokenExpiresAt);
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('expiresAt', newExpiresAt.toString());
        localStorage.setItem('refreshTokenExpiresAt', newRefreshTokenExpiresAt.toString());
        localStorage.setItem('username', data.username);

        // Não é necessário chamar fetchCustomerData aqui,
        // já que o useEffect ficará observando a mudança de accessToken.
        return true;
      }
      console.error('Payload de login inesperado:', data);
      return false;
    } catch (error) {
      console.error('Erro na requisição de login:', error);
      return false;
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setExpiresAt(null);
    setRefreshTokenExpiresAt(null);
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('refreshTokenExpiresAt');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        expiresAt,
        refreshTokenExpiresAt,
        user,
        login,
        logout,
        fetchWithAuth,
        fetchCustomerData,
        refreshTokens
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
