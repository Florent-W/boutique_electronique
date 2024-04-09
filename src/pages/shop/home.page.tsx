import { Button } from "@tremor/react";
import { useUser } from "../../app/contexts/user.context";
import { Link } from "react-router-dom";
import { RiAccountCircleLine, RiShoppingCartLine } from "@remixicon/react";
import Navbar from "../../components/Navbar";
import { Product, getProducts } from "../../api/products";
import { useEffect, useState } from "react";
import { Category, getCategories } from "../../api/categories";
import Layout from "../../components/Layout";
import ProductsList from "../../components/ProductsList";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useUser();
  console.log(user);
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
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
      <div>
        <h1 className="text-xl font-semibold mb-5">Top Catégories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {categories.map((category: Category) => (
            <Link to={`/shop/${category.id}`} className="group">
              <div
                className="p-5 rounded-xl shadow-lg bg-cover bg-no-repeat bg-center h-[150px] relative flex items-end justify-center group-hover:shadow-sm transition-transform"
                key={category.id}
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.5)), url(${category.image})`,
                }}
              >
                <p className="text-xl text-white">{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {categories.map((category: Category) => {
        const productsByCategory = products.filter(
          (product) => product.categoryId == category.id
        );

        return (
          <ProductsList
            key={category.id}
            category={category}
            products={productsByCategory}
          />
        );
      })}
    </Layout>
  );
}
