import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../productCard/ProductCard';
import './ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => setProducts(response.data.products))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row ms-5">
        {products.map(product => (
           <div key={product.id} className="col-md-4 mb-4">
           <ProductCard product={product} />
         </div>
        ))}
      </div>
    </div>
  );
}
