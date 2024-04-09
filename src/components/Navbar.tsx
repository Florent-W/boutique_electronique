import {
  RiAccountCircleLine,
  RiAddFill,
  RiShoppingCartLine,
} from "@remixicon/react";
import { Button } from "@tremor/react";
import { Link } from "react-router-dom";
import { useUser } from "../app/contexts/user.context";

export default function Navbar() {
  const { user } = useUser();

  const countItemsInCart = () => {
    const cart = localStorage.getItem("cart");
    if (!cart) return 0;
    const items = JSON.parse(cart);
    return items.length;
  };
  return (
    <nav className="bg-white border-b border-gray-400 w-full px-[5%] fixed top-0 z-50">
      <div className="flex justify-between items-center p-4 max-w-[1200px] mx-auto">
        <Link to="/" className="text-2xl font-bold">
          <img src="/assets/brand/logo.svg" alt="logo" className="h-10" />
        </Link>
        <div className="flex items-center gap-5 w-full justify-end">
          <Link
            to="/add-product"
            className="flex items-center gap-2 bg-primary px-4 py-2 rounded-xl text-white"
          >
            <RiAddFill size={25} />
            <span className="inline-block text-sm">Vendre un produit</span>
          </Link>
          <input
            type="text"
            placeholder="Rechercher un produit"
            className="px-5 py-2 bg-gray-200 border-0 rounded-full placeholder:text-gray-400 max-w-[300px] w-full outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 hidden sm:block"
          />
          <Link to="/cart" className="relative">
            <RiShoppingCartLine size={25} />
            {countItemsInCart() > 0 && (
              <span className="absolute top-3 -right-2 bg-primary text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
                {countItemsInCart()}
              </span>
            )}
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
