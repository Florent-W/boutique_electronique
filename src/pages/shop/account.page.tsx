import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../app/contexts/user.context';
import './account.css';
import Navbar from '../../components/Navbar';

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

const AccountPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const { user } = useUser();
  const userId = user?.id;
  
  console.log(user);
  
  
  useEffect(() => {
      const fetchOrders = async () => {
          try {
              const response = await axios.get(`http://localhost:4000/api/order/user`, {headers: { Authorization: user?.token }});
              setOrders(response.data);
              console.log(response.data); 
          } catch (error) {
              console.error('Error fetching orders:', error);
          }
      };
  
      fetchOrders();
  }, [userId]);

  return (
    <div>
        <Navbar/>
    <div className="account-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
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
    </div>
  );
  
};

export default AccountPage;
