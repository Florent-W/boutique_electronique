import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { createOrder } from "../api/order";
import { useUser } from "../app/contexts/user.context";

export default function CheckoutForm() {
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null as string | null);
  const [isProcessing, setIsProcessing] = useState(false);

  // une fonction qui va récupérer les produits dans le panier et faire un tableau avec les id de chaque produit (ex: product.id)
  const getProductsIdInCart = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartItems = JSON.parse(cart);
      return Object.values(cartItems).map((item: any) => item.id);
    }
    return [];
  };

  const getAmount = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartItems = JSON.parse(cart);
      return Object.values(cartItems).reduce(
        (acc: number, currentItem: any) => {
          return acc + currentItem.price;
        },
        0
      );
    }
    return 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    await createOrder(
      {
        userId: user?.id as string,
        product: getProductsIdInCart(),
        totalAmount: getAmount(),
        status: "pending",
      },
      user?.token as string
    );

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message ?? "An unexpected error occured.");
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg"
    >
      <PaymentElement id="payment-element" />
      <button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        className="bg-primary text-white rounded-lg px-5 py-2 text-lg mt-5 w-full"
      >
        {isProcessing ? "Chargement..." : "Payer"}
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div className="text-red-500 mt-5 text-center">{message}</div>
      )}
    </form>
  );
}
