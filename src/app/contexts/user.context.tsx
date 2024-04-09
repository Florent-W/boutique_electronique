import React, { createContext, useState, useContext } from "react";

export type User = {
  token: string;
  id: string;
  email: string;
  role?: string;
};

const UserContext = createContext({
  user: null as User | null,
  updateUser: (userData: User | null) => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null as User | null);

  const updateUser = (userData: User | null) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
