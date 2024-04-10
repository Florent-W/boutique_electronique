import { FormEvent, useEffect, useState } from "react";
import { Category, getCategories } from "../../api/categories";
import Layout from "../../components/Layout";
import { createClient } from "@supabase/supabase-js";
import { useUser } from "../../app/contexts/user.context";
import { createProduct } from "../../api/products";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_KEY as string
);

export default function AddProductPage() {
  const [categoties, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      const { data: uploadData, error } = await supabase.storage
        .from("image")
        .upload(
          user?.id + "/" + Date.now() + "_" + (data.image as File).name,
          data.image as File
        );

      if (!uploadData) throw error;

      const imageUrl =
        process.env.REACT_APP_SUPABASE_URL +
        "/storage/v1/object/public/image/" +
        uploadData?.path;

      const product = await createProduct(
        {
          name: data.name as string,
          price: Number(data.price),
          description: data.description as string,
          image: imageUrl as string,
          categoryId: data.category as string,
          userId: user?.id as string,
        },
        user?.token as string
      );

      console.log(product);

      window.location.href = "/";
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-semibold mb-5">Vendre un produit</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <input
              type="text"
              placeholder="Nom de l'article"
              className="w-full text-lg p-3 border border-gray-300 rounded-lg mb-5 col-span-3"
              name="name"
              required
            />
            <input
              type="number"
              placeholder="Prix de l'article"
              className="w-full text-lg p-3 border border-gray-300 rounded-lg mb-5"
              name="price"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="file"
              placeholder="Image de l'article"
              className="w-full text-lg p-3 border border-gray-300 rounded-lg mb-5"
              name="image"
              required
            />
            <select
              className="w-full text-lg p-3 border border-gray-300 rounded-lg mb-5"
              name="category"
              required
            >
              <option value="" disabled selected>
                Catégorie
              </option>
              {categoties.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg mb-5 min-h-[200px]"
            placeholder="Description de l'article"
            name="description"
            required
          />

          <button
            type="submit"
            className="bg-primary text-white rounded-lg px-5 py-3 text-lg"
          >
            {loading ? "Chargement..." : "Vendre un produit"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
