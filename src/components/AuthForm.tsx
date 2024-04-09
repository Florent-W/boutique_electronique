import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_KEY as string
);

export default function AuthForm() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <img
          src="/assets/brand/logo.svg"
          alt="logo"
          className="h-10 mx-auto mb-10"
        />

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#B30909",
                  brandAccent: "#a00808",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
