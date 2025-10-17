import { createContext, useState } from "react";
import type { RequestLoginDto } from "../types/auth";
import { useGetLocalStorage } from "../hooks/useGetLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogin, postLogout, postRefresh } from "../apis/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (loginData: RequestLoginDto) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
  refreshAccessToken: async () => "",
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    getToken: loadAccessToken,
    setToken: saveAccessToken,
    removeToken: clearAccessToken,
  } = useGetLocalStorage<string>(LOCAL_STORAGE_KEY.accessToken);
  const {
    getToken: loadRefreshToken,
    setToken: saveRefreshToken,
    removeToken: clearRefreshToken,
  } = useGetLocalStorage<string>(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(
    loadAccessToken()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    loadRefreshToken()
  );

  // login과 refresh 공통 로직
  const setToken = (access: string, refresh?: string) => {
    saveAccessToken(access);
    setAccessToken(access);

    if (refresh) {
      saveRefreshToken(refresh);
      setRefreshToken(refresh);
    }
  };

  const login = async (loginData: RequestLoginDto) => {
    const { data } = await postLogin(loginData);
    setToken(data.accessToken, data.refreshToken);
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    const { data } = await postRefresh(refreshToken!);
    setToken(data.accessToken, data.refreshToken);
    return data.accessToken;
  };

  const logout = async () => {
    try {
      await postLogout();

      clearAccessToken();
      clearRefreshToken();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
