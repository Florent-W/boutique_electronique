import { useEffect } from "react";
import Layout from "../../components/Layout";
// import { useSearchParams } from "react-router-dom";
import { completeOrder } from "../../api/order";

export default function CompletionPage() {
  // const [searchParams] = useSearchParams();

  const removeCart = () => {
    localStorage.removeItem("cart");
  };

  // const getQueryParams = () => {
  //   const params = new URLSearchParams(searchParams);
  //   return {
  //     ...Object.fromEntries(params.entries()),
  //   };
  // };

  const getOrder = () => {
    const order = localStorage.getItem("order");
    if (order) {
      return JSON.parse(order);
    }
    return null;
  };

  const fetchCompleteOrder = async () => {
    const order = getOrder();
    await completeOrder(order.id);
  };

  useEffect(() => {
    removeCart();
    fetchCompleteOrder();
  }, []);

  return (
    <Layout>
      <div>
        <h2 className="text-3xl font-bold text-primary mb-10 text-center">
          Commande passée avec succès
        </h2>
        <p className="text-center">Votre commande a été passée avec succès.</p>
      </div>
    </Layout>
  );
}
