import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import formatPrice from "../../helpers/formatPrice";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = React.useState<any>([]);
  const getCartItems = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  };

  const total = Object.values(cartItems).reduce(
    (acc: number, currentItem: any) => {
      return acc + currentItem.price;
    },
    0
  );

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <Layout>
      <div>
        <h2 className="text-3xl font-bold text-primary mb-10">Mon Panier</h2>
        {cartItems.length === 0 ? (
          <p>Votre panier est vide</p>
        ) : (
          <div>
            {cartItems.map((item: any, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-200 p-4"
              >
                <div className="flex gap-5">
                  <Link to={`/article/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[120px] h-[120px] object-cover rounded-lg"
                    />
                  </Link>
                  <div>
                    <Link to={`/article/${item.id}`}>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-400">{item.description}</p>

                    <button
                      onClick={() => {
                        const newCart = cartItems.filter(
                          (cartItem: any) => cartItem.id !== item.id
                        );
                        setCartItems(newCart);
                        localStorage.setItem("cart", JSON.stringify(newCart));
                      }}
                      className="text-sm text-red-500 mt-3"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
                <p className="text-lg font-semibold">
                  {formatPrice(item.price)}
                </p>
              </div>
            ))}
            <div className="flex justify-between items-center border-t border-gray-200 p-4">
              <h3 className="text-lg font-semibold">Total</h3>
              <p className="text-lg font-semibold">{formatPrice(total)}</p>
            </div>

            <div className="flex justify-end">
              <button className="bg-primary text-white text-lg  px-7 py-4 rounded-xl mt-10">
                Commander
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
