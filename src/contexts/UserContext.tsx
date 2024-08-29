import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";

import { LOGOUT_SUCCESS, USER } from "../utils/constants";
import { getItem, removeItem } from "../utils/helperfuntions";
import { User } from "../services/UserService";
import { toast } from "sonner";

interface UserAuthContextInterface {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: User) => void;
  logout: () => void;
}

const AuthContext = createContext<UserAuthContextInterface | undefined>(
  undefined
);

// Context provider
export const UserAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = getItem(USER);
    if (storedUser) {
      const formattedUser: User = JSON.parse(storedUser);
      setUser(formattedUser);
      if (formattedUser?.token) {
        setIsAuthenticated(true);
      }
    }
  }, []);
  const login = (data: User) => {
    setIsAuthenticated(true);
    setUser(data);
  };

  const logout = () => {
    toast.success(LOGOUT_SUCCESS);
    setIsAuthenticated(false);
    removeItem(USER);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated, login, logout }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useUserAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};
