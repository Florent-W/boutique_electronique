import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import formatPrice from "../../helpers/formatPrice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
dayjs.extend(relativeTime);
dayjs.locale("fr");

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/product/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const addToCart = () => {
    if (product && !checkIfInCart()) {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = [...existingCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      fetchProduct();
      // alert("Article ajouté au panier !");
    }
  };

  const checkIfInCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart.find((item: any) => item.id === product.id);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        <div className="col-span-2">
          <a
            href={product.image}
            className="text-primary"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-xl shadow-lg"
            />
          </a>
          <p className="text-gray-500 mt-5">
            {dayjs(product.createdAt).fromNow()}
          </p>
          <h1 className="text-3xl font-semibold text-primary">
            {product.name}
          </h1>
          <h2 className="text-xl font-semibold mt-2">
            {formatPrice(product.price)}
          </h2>

          <p className="mt-2 text-gray-700">{product.description}</p>
        </div>
        <div className="col-span-1 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="hidden lg:block text-3xl font-semibold mt-2 mb-5">
            {formatPrice(product.price)}
          </h2>
          <button
            onClick={addToCart}
            className={
              checkIfInCart()
                ? "bg-gray-200 text-gray-400 p-3 rounded-xl w-full cursor-not-allowed"
                : "bg-primary text-white p-3 rounded-xl w-full"
            }
          >
            {checkIfInCart() ? "Déjà dans le panier" : "Ajouter au panier"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ArticlePage;
