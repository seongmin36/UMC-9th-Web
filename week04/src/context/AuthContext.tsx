import { createContext, useState } from "react";
import type { RequestLoginDto } from "../types/auth";
import { useGetLocalStorage } from "../hooks/useGetLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogin, postLogout } from "../apis/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (loginData: RequestLoginDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
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

  const login = async (loginData: RequestLoginDto) => {
    const { data } = await postLogin(loginData);

    const newAccessToken = data.accessToken;
    const newRefreshToken = data.refreshToken;

    saveAccessToken(newAccessToken);
    saveRefreshToken(newRefreshToken);

    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
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
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
