import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../app/contexts/user.context";
import "./account.css";
import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";
import { createClient } from "@supabase/supabase-js";

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
  const { user } = useUser();
  const userId = user?.id;

  console.log(user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/order/user`,
          { headers: { Authorization: user?.token } }
        );
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
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
                <p className="order-info">Date: {order.date}</p>
                <p className="order-info">Status: {order.status}</p>
                <p className="order-info">Total Amount: {order.totalAmount}</p>
                <ul className="product-list">
                  {order.product.map((product, index) => (
                    <li key={index}>
                      <p>Product ID: {product.id}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default AccountPage;
