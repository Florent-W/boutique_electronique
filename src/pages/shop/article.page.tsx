import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  sellerId: string;
  image: string | null;
  categoryId: string;
  createdAt: string;
  updatedAt: string | null;
  order: any[]; // Assure-toi que le type de cette propriété est correctement défini
}

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>Seller ID: {product.sellerId}</p>
          {product.image && <img src={product.image} alt={product.name} />}
          <p>Category ID: {product.categoryId}</p>
          <p>Created At: {product.createdAt}</p>
          <p>Updated At: {product.updatedAt}</p>
          {/* Ajoute d'autres éléments selon les besoins */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ArticlePage;
