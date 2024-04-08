import { useUser } from "../../app/contexts/user.context";

export default function HomePage() {
  const { user } = useUser();

  return (
    <div className="">
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello world! {user?.name}
      </h1>
    </div>
  );
}
