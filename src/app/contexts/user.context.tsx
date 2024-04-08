import React, { createContext, useState, useContext } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "user";
};

const UserContext = createContext({
  user: null as User | null,
  updateUser: (userData: User) => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null as User | null);

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
