import React, { createContext, useState, useContext } from "react";

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  price: string;
  userId: string;
};

const ProductContext = createContext({
  product: null as Product | null,
  updateProduct: (productData: Product | null) => {},
});

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [product, setProduct] = useState(null as Product | null);

  const updateProduct = (productData: Product | null) => {
    setProduct(productData);
  };

  return (
    <ProductContext.Provider value={{ product, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
