import { Button } from "@tremor/react";
import { useUser } from "../../app/contexts/user.context";
import { Link } from "react-router-dom";
import { RiAccountCircleLine, RiShoppingCartLine } from "@remixicon/react";
import Navbar from "../../components/Navbar";
import { getProducts } from "../../api/products";
import { useEffect } from "react";

export default function HomePage() {
  const { user } = useUser();
  console.log(user);
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="">
      <Navbar />
    </div>
  );
}
