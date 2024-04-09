import { useEffect } from "react";
import Layout from "../../components/Layout";
import { useSearchParams } from "react-router-dom";

export default function CompletionPage() {
  const [searchParams] = useSearchParams();

  const removeCart = () => {
    localStorage.removeItem("cart");
  };

  const getQueryParams = () => {
    const params = new URLSearchParams(searchParams);
    return {
      ...Object.fromEntries(params.entries()),
    };
  };

  useEffect(() => {
    removeCart();
    console.log(getQueryParams());
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
