import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import './article.css';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);

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
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = [...existingCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert('Article ajouté au panier !');
    }
  };

  return (
    <div>
    <Navbar />
    <div className="article-container">
      {product ? (
        <div className="article-details">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>Seller ID: {product.sellerId}</p>
          {product.image && <img src={product.image} alt={product.name} />}
          <p>Category ID: {product.categoryId}</p>
          <p>Created At: {product.createdAt}</p>
          <button className="add-to-cart-btn" onClick={addToCart}>Add to Cart</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
};

export default ArticlePage;
