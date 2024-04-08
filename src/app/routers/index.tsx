/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import DefaultRouter from "./default";
import AdminRouter from "./admin";
import AuthenticationRouter from "./authentication";
import { useUser } from "../contexts/user.context";

export default function App() {
  const { user, updateUser } = useUser();

  useEffect(() => {
    // get user info from the server
    updateUser({
      id: "123",
      name: "John Doe",
      email: "john.doe@gmail.com",
      role: "admin",
    });
  }, []);

  return (
    <BrowserRouter>
      {/* NOT AUTHENTICATED */}
      {!user && <AuthenticationRouter />}

      {/* AUTHENTICATED */}
      {user && <DefaultRouter />}
      {user?.role === "admin" && <AdminRouter />}
    </BrowserRouter>
  );
}
