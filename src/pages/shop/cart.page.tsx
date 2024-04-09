import React from 'react';
import Navbar from '../../components/Navbar';
import './cart.css';

const CartPage: React.FC = () => {
  const cartItems: { [key: string]: any } = JSON.parse(localStorage.getItem('cart') || '{}');

  const total = Object.values(cartItems).reduce((acc: number, currentItem: any) => {
    return acc + currentItem.price;
  }, 0);

  return (
    <div>
          <Navbar />


<div className="cart-container">
  {Object.keys(cartItems).length === 0 ? (
    <p>Your cart is empty</p>
  ) : (
    <div>
      <ul className="cart-items">
        {Object.keys(cartItems).map((itemId: string) => (
          <li key={itemId} className="cart-item">
            <h2>{cartItems[itemId].name}</h2>
            <p>Description: {cartItems[itemId].description}</p>
            <p>Price: {cartItems[itemId].price}</p>
          </li>
        ))}
      </ul>
      <p className="total">Total: {total}</p>
    </div>
  )}
</div>
</div>

  );
};

export default CartPage;
