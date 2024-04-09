import { RiAccountCircleLine, RiShoppingCartLine } from "@remixicon/react";
import { Button } from "@tremor/react";
import { Link } from "react-router-dom";
import { useUser } from "../app/contexts/user.context";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="bg-white border-b border-gray-400 w-full px-[5%] fixed top-0 z-50">
      <div className="flex justify-between items-center p-4 max-w-[1200px] mx-auto">
        <Link to="/" className="text-2xl font-bold">
          <img src="/assets/brand/logo.svg" alt="logo" className="h-10" />
        </Link>
        <div className="flex items-center gap-5">
          <input
            type="text"
            placeholder="Rechercher un produit"
            className="px-5 py-2 bg-gray-200 border-0 rounded-full placeholder:text-gray-400 max-w-[300px] w-full outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 hidden sm:block"
          />
          <Link to="/cart">
            <RiShoppingCartLine size={25} />
          </Link>
          <Link to="/account">
            <RiAccountCircleLine size={25} />
          </Link>

          {user && user.role === "admin" && (
            <Button color="red" size="sm">
              <Link to="/admin">Espace Admin</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
