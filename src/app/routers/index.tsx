/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import DefaultRouter from "./default";
import AdminRouter from "./admin";
import { useUser } from "../contexts/user.context";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_KEY as string
);

export default function App() {
  const { user, updateUser } = useUser();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (!session) return;
      updateUser({
        token: session?.access_token,
        id: session?.user?.id,
        email: session?.user?.email,
        role: session?.user?.role,
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session: any) => {
      if (!session) return;
      console.log("session -> ", session);
      console.log("_event -> ", _event);

      updateUser({
        token: session?.access_token,
        id: session?.user?.id,
        email: session?.user?.email,
        role: session?.user?.role,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      {!user ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      ) : (
        <>
          <DefaultRouter />
          <AdminRouter />
        </>
      )}
    </BrowserRouter>
  );
}
