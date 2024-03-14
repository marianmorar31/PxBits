"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Product {
  _id: number;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  price: number;
}

const ProductDetails: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get<Product>(`http://localhost:8000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto flex">
        <div className="flex-none w-1/2 pr-8">
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
        </div>
        <div className="flex-grow">
          <h1 className="text-4xl font-bold mb-4">
            Product name: {product.name}</h1>
          <p className="text-gray-600 mb-2">
          Brand: {product.brand} 
          </p>
          <p className="text-gray-600 mb-2">
          Category: {product.category}
          </p>
          <p className="text-gray-700 mb-4">
            Description: {product.description}</p>
          <p className="text-green-600 font-bold text-2xl">Price: ${product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
