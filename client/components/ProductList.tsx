"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

interface Product {
  _id: number;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  price: number;
}
interface SearchBarProps {
  onSearch: (keyword: string, sortOrder: string) => void;
  onSort: (sortOrder: string) => void;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');

  const fetchData = async (pageNumber: number, keyword?: string, sortOrder?: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        keyword: keyword || '',
        sortOrder: sortOrder || 'default',
      });
      const { data } = await axios.get<{ products: Product[]; page: number; pages: number }>(
        `http://localhost:8000/api/products?${params}`
      );

      console.log('Received data from API:', data);

      if (Array.isArray(data.products)) {
        setProducts(data.products);
        setCurrentPage(data.page);
        setTotalPages(data.pages);
      } else {
        console.error('Invalid data received from the API:', data);
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (keyword: string, sortOrder: string) => {
    fetchData(1, keyword, sortOrder);
  };
  const handleSort = (sortOrder: string) => {
 
    let sortedProducts: Product[];
  
    switch (sortOrder) {
      case 'asc':
        sortedProducts = [...products].sort((a, b) => a.price - b.price);
        break;
  
      case 'desc':
        
        sortedProducts = [...products].sort((a, b) => b.price - a.price);
        break;
  
      default:
       
        sortedProducts = [...products];
        break;
    }
  
  
    setProducts(sortedProducts);
  };


  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div id='discover' className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Product List</h1>
      <SearchBar onSearch={handleSearch} onSort={handleSort}/>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};
export default ProductList;