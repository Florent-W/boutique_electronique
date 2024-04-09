import React from 'react';
import Navbar from '../../components/Navbar';
import './cart.css';

const CartPage: React.FC = () => {
  // Récupère le panier depuis le localStorage
  const cartItems: { [key: string]: any } = JSON.parse(localStorage.getItem('cart') || '{}');

  // Calcule le total en parcourant tous les articles dans le panier
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
            <p>Quantity: {cartItems[itemId].quantity}</p>
          </li>
        ))}
      </ul>
      <p className="total">Total: {total}</p> {/* Affiche le total */}
    </div>
  )}
</div>
</div>

  );
};

export default CartPage;
