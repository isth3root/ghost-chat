// ========== PACKAGES ========== \\
import React, { createContext, useState, useEffect } from "react";

// ========== TYPES & UTILS ========== \\
import { User } from "../types/User";
import { UserContextType } from "../types/User";

const initialUser: User | null = null;

const UserContext = createContext<UserContextType>({
  user: initialUser,
  setUser: () => {},
});

export const UserProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : initialUser;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
