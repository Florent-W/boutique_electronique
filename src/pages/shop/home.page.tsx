import { Button } from "@tremor/react";
import { useUser } from "../../app/contexts/user.context";
import { Link } from "react-router-dom";
import { RiAccountCircleLine, RiShoppingCartLine } from "@remixicon/react";
import Navbar from "../../components/Navbar";
import { getProducts } from "../../api/products";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const { user } = useUser();
  console.log(user);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      console.log(response);
      setProducts(response);
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
      {products.map((product: any) => (
        <div>
          <p>{product?.name}</p>
        </div>
      ))}
    </div>
  );
}
