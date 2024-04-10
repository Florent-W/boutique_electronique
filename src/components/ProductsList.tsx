import { Button } from "@tremor/react";
import { Category } from "../api/categories";
import { Product } from "../api/products";
import { Link } from "react-router-dom";

type ProductsListProps = {
  category: Category;
  products: Product[];
};

export default function ProductsList({
  category,
  products,
}: ProductsListProps) {
  return (
    <div className="mb-10 mt-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">{category.name}</h2>
        <Link
          to={`/shop/${category.id}`}
          className="bg-primary text-white rounded-lg px-5 py-3 text-sm"
        >
          Voir tout
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {products
          .filter((product: Product) => product.status === 1)
          .map((product: Product) => (
            <Link
              to={`/article/${product.id}`}
              key={product.id}
              className="rounded-xl shadow-lg relative flex flex-col items-center justify-start group h-full bg-white overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="min-h-[200px] h-full max-h-[200px] w-full object-cover"
              />
              <div className="p-5">
                <p className="text-lg font-semibold mt-2">{product.name}</p>
                <p className="text-gray-500">{product.price} €</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
