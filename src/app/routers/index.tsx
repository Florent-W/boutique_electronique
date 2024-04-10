/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import DefaultRouter from "./default";
import AdminRouter from "./admin";
import { useUser } from "../contexts/user.context";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { getUser } from "../../api/users";
import AuthForm from "../../components/AuthForm";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_KEY as string
);

export function ProtectedRoute({ children }: any) {
  const { user } = useUser();

  if (!user) return <AuthForm />;

  return children;
}

export function AdminRoute({ children }: any) {
  const { user } = useUser();

  if (!user) return <AuthForm />;

  if (user?.role !== "admin") return window.location.replace("/");

  return children;
}

export default function App() {
  const { updateUser } = useUser();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }: any) => {
      if (!session) return;

      const userinfo = await getUser(session?.user?.id);

      updateUser({
        token: session?.access_token,
        id: session?.user?.id,
        userId: userinfo?.userId,
        firstName: userinfo?.firstName,
        lastName: userinfo?.lastName,
        email: session?.user?.email,
        role: userinfo?.role || "user",
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session: any) => {
      if (!session) return;

      const userinfo = await getUser(session?.user?.id);

      updateUser({
        token: session?.access_token,
        id: session?.user?.id,
        userId: userinfo?.userId,
        firstName: userinfo?.firstName,
        lastName: userinfo?.lastName,
        email: session?.user?.email,
        role: userinfo?.role || "user",
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <DefaultRouter />
      <AdminRouter />
    </BrowserRouter>
  );
}
