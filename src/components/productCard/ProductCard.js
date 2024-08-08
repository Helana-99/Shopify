import React from "react";
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../features/cartslice';
import { useNavigate } from 'react-router-dom';
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const stockStatus = product.stock > 0 ? 'In stock' : 'Out of stock';
  const stockClass = product.stock > 0 ? 'badge-success' : 'badge-danger';
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < product.rating) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>);
    } else {
      stars.push(<i key={i} className="far fa-star text-warning"></i>);
    }
  }
  const addToCartHandler = () => {
    dispatch(addItemToCart(product));
    if (window.confirm('Product added to cart! Do you want to go to the cart?')) {
      navigate('/cart');
    }
  };

  return (
    <div className="card w-75">
      <div className="card-img-container" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
        <span className={`badge ${stockClass}`}>{stockStatus}</span>
        <img src={product.thumbnail} className="card-img-top" alt={product.title} />
      </div>
      <div className="card-body">
        <h5 className="card-title" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>{product.title}</h5>
        <p className="card-text">${product.price}</p>
        <div className="pb-3">{stars}</div>
        <button className="btn btn-outline-light text-dark border-1 border-dark" onClick={addToCartHandler}>
          <i className="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    </div>
  );
}