import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api, { AuthResponse, AuthTokens, AuthUser } from '../services/api';

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (name: string, email: string, password: string) => Promise<AuthResponse>;
  loginWithGoogle: (idToken: string) => Promise<AuthResponse>;
  loginWithGoogleAccessToken: (accessToken: string) => Promise<AuthResponse>;
  loginWithApple: (idToken: string, user?: { email?: string; name?: { firstName?: string; lastName?: string } }) => Promise<AuthResponse>;
  logout: () => void;
  refreshAccess: () => Promise<AuthTokens | null>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  user: 'nexa_auth_user',
  access: 'nexa_auth_access',
  refresh: 'nexa_auth_refresh',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.user);
    const storedAccess = localStorage.getItem(STORAGE_KEYS.access);
    const storedRefresh = localStorage.getItem(STORAGE_KEYS.refresh);
    if (storedUser && storedAccess && storedRefresh) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedAccess);
      setRefreshToken(storedRefresh);
    }
    setIsLoading(false);
  }, []);

  const persistSession = (authResponse: AuthResponse) => {
    setUser(authResponse.user);
    setAccessToken(authResponse.tokens.access_token);
    setRefreshToken(authResponse.tokens.refresh_token);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(authResponse.user));
    localStorage.setItem(STORAGE_KEYS.access, authResponse.tokens.access_token);
    localStorage.setItem(STORAGE_KEYS.refresh, authResponse.tokens.refresh_token);
  };

  const clearSession = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem(STORAGE_KEYS.access);
    localStorage.removeItem(STORAGE_KEYS.refresh);
  };

  const login = async (email: string, password: string) => {
    const response = await api.login(email, password);
    persistSession(response);
    return response;
  };

  const signup = async (name: string, email: string, password: string) => {
    const response = await api.register(name, email, password);
    persistSession(response);
    return response;
  };

  const loginWithGoogle = async (idToken: string) => {
    const response = await api.googleOAuth(idToken);
    persistSession(response);
    return response;
  };

  const loginWithGoogleAccessToken = async (accessToken: string) => {
    const response = await api.googleOAuthWithAccessToken(accessToken);
    persistSession(response);
    return response;
  };

  const loginWithApple = async (idToken: string, user?: { email?: string; name?: { firstName?: string; lastName?: string } }) => {
    const response = await api.appleOAuth(idToken, user);
    persistSession(response);
    return response;
  };

  const logout = () => {
    clearSession();
  };

  const refreshAccess = async (): Promise<AuthTokens | null> => {
    if (!refreshToken) return null;
    try {
      const tokens = await api.refresh(refreshToken);
      setAccessToken(tokens.access_token);
      localStorage.setItem(STORAGE_KEYS.access, tokens.access_token);
      if (tokens.refresh_token) {
        setRefreshToken(tokens.refresh_token);
        localStorage.setItem(STORAGE_KEYS.refresh, tokens.refresh_token);
      }
      return tokens;
    } catch (err) {
      clearSession();
      return null;
    }
  };

  const value = useMemo(
    () => ({
      user,
      accessToken,
      refreshToken,
      isLoading,
      login,
      signup,
      loginWithGoogle,
      loginWithGoogleAccessToken,
      loginWithApple,
      logout,
      refreshAccess,
    }),
    [user, accessToken, refreshToken, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};


