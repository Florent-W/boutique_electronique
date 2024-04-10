import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../app/contexts/user.context";
import "./account.css";
import Layout from "../../components/Layout";
import { createClient } from "@supabase/supabase-js";
import { Product } from "../../api/products";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
dayjs.extend(relativeTime);
dayjs.locale("fr");

interface Order {
  id: string;
  userId: string;
  date: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  product: any[];
}

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_KEY as string
);

const AccountPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useUser();
  const userId = user?.id;
  useEffect(() => {

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/product/user`,
        { headers: { Authorization: `Bearer ${user?.token}` }}
      );
      setProducts(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/order/user`,
          { headers: { Authorization: `Bearer ${user?.token}` }}
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();

    fetchProducts();
  }, [userId]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <Layout>
      <div className="account-container">
        <div className="flex justify-between items-center mb-5 w-full">
          <h2>Mes commandes</h2>
          <button
            className="bg-primary text-white px-5 py-2 rounded-xl"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
        {orders.length === 0 ? (
          <p>Vous n'avez pas encore passé de commande</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <p className="order-info">Date: {dayjs(order.createdAt).fromNow()}</p>
                <p className="order-info">Status: {order.status}</p>
                <p className="order-info">Total Amount: {order.totalAmount}</p>
                <ul className="product-list">
                  {order.product.map((product, index) => (
                    <li key={index}>
                      <p>{product.name}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}

{products.length === 0 ? (
          <p>Vous n'avez pas encore déposé d'article</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <a
            href={product.image}
            className="text-primary"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[200px] object-cover rounded-xl shadow-lg"
            />
          </a>
                <p className="order-info">Name: {product.name}</p>
                <p className="order-info">Date: {dayjs(product.createdAt).fromNow()}</p>
                <p className="order-info">Amount: {product.price}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default AccountPage;
