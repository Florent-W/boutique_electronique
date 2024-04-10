import Layout from "../../components/Layout";
import { loadStripe } from "@stripe/stripe-js";
import { createPayment } from "../../api/payment";
import { useUser } from "../../app/contexts/user.context";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import { createOrder } from "../../api/order";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY as string
);

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const { user } = useUser();

  const getProductsIdInCart = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartItems = JSON.parse(cart);
      return Object.values(cartItems).map((item: any) => item.id);
    }
    return [];
  };

  const calculateCartTotal = () => {
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

  const fetchPaymentIntent = async () => {
    try {
      const order = await createOrder(
        {
          userId: user?.id as string,
          product: getProductsIdInCart(),
          totalAmount: calculateCartTotal(),
          status: "pending",
        },
        user?.token as string
      );

      console.log(order);

      localStorage.setItem("order", JSON.stringify(order) as string);

      const response = await createPayment(
        calculateCartTotal() * 100,
        user?.token as string,
        order.id as string,
        user?.id as string
      );

      setClientSecret(response.client_secret);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((_prev) => false);
    }
  };

  useEffect(() => {
    fetchPaymentIntent();
  }, []);

  return (
    <Layout>
      <div>
        <h2 className="text-3xl font-bold text-primary mb-10 text-center">
          Paiement
        </h2>

        <div className="flex justify-center">
          {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>
    </Layout>
  );
}
