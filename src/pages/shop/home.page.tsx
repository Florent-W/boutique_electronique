import { Button } from "@tremor/react";
import { useUser } from "../../app/contexts/user.context";
import { Link } from "react-router-dom";
import { RiAccountCircleLine, RiShoppingCartLine } from "@remixicon/react";
import Navbar from "../../components/Navbar";
import { getProducts } from "../../api/products";
import { useEffect, useState } from "react";
import { Category, getCategories } from "../../api/categories";
import Layout from "../../components/Layout";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useUser();
  console.log(user);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      console.log(response);
      // setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      console.log(response);
      setCategories(response.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <Layout>
      {/* 5 cols */}
      <div className="grid grid-cols-5 gap-5">
        {categories.map((category: Category) => (
          <div className="bg-white p-5 rounded-xl shadow-md" key={category.id}>
            <p>{category.name}</p>
          </div>
        ))}
      </div>
      {products.map((product: any) => (
        <div>
          <p>{product?.name}</p>
        </div>
      ))}
    </Layout>
  );
}
