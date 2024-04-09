import { Button } from "@tremor/react";
import { useUser } from "../../app/contexts/user.context";

export default function HomePage() {
  const { user, updateUser } = useUser();
  console.log(user);
  return (
    <div className="">
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello world! {user?.role}
      </h1>
      <Button
        onClick={() => {
          updateUser(null);
        }}
      >
        Click me
      </Button>
    </div>
  );
}
