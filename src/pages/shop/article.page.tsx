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

  const addToCart = () => {
    if (product) {
      // Récupère le panier existant depuis le localStorage
      const existingCart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
  
      // Ajoute le produit actuel au panier
      const updatedCart = [...existingCart, product];
  
      // Met à jour le panier dans le localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert('Article ajouté au panier !');
    }
  };
  

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <p>Seller ID: {product.sellerId}</p>
          {product.image && <img src={product.image} alt={product.name} />}
          <p>Category ID: {product.categoryId}</p>
          <p>Created At: {product.createdAt}</p>
          <p>Updated At: {product.updatedAt}</p>
          <button onClick={addToCart}>Add to Cart</button> {/* Ajoute le bouton pour ajouter au panier */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ArticlePage;
