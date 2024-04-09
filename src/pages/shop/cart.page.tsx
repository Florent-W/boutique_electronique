import React from 'react';

const CartPage: React.FC = () => {
  // Récupère le panier depuis le localStorage
  const cartItems: { [key: string]: any } = JSON.parse(localStorage.getItem('cart') || '{}');

  // Calcule le total en parcourant tous les articles dans le panier
  const total = Object.values(cartItems).reduce((acc: number, currentItem: any) => {
    return acc + currentItem.price;
  }, 0);

  return (
    <div>
      <h1>Cart</h1>
      {Object.keys(cartItems).length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {Object.keys(cartItems).map((itemId: string) => (
              <li key={itemId}>
                <h2>{cartItems[itemId].name}</h2>
                <p>Description: {cartItems[itemId].description}</p>
                <p>Price: {cartItems[itemId].price}</p>
                <p>Quantity: {cartItems[itemId].quantity}</p>
              </li>
            ))}
          </ul>
          <p>Total: {total}</p> {/* Affiche le total */}
        </div>
      )}
    </div>
  );
};

export default CartPage;
