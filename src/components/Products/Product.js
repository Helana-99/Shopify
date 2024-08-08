import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../features/cartslice';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Product.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const addToCartHandler = () => {
    dispatch(addItemToCart(product));
    if (window.confirm('Product added to cart! Do you want to go to the cart?')) {
      navigate('/cart');
    }
  };

  return (
    <div className="product-details container mt-5">
      <div className="row ">
        <div className="col-md-6 mt-5">
          <img
            src={product.thumbnail}
            className="img-fluid main-image border-dark border-2 ps-5"
            alt={product.title}
          />
          <div className="row mt-2">
            {product.images.map((image, index) => (
              <div className="col-3" key={index}>
                <img
                  src={image}
                  className="img-fluid additional-image shadow"
                  alt={`${product.title} ${index}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6 mt-5 ">
          <h2>{product.title}</h2>
          <p>Category: {product.category}</p>
          <p>Brand: {product.brand}</p>
          <div className="rating pb-3">
            {Array.from({ length: 5 }, (_, i) => (
              <i
                key={i}
                className={`fa-star ${
                  i < Math.floor(product.rating) ? "fas" : "far"
                } text-warning`}
              ></i>
            ))}
          </div>
          <p>{product.description}</p>
          {product.discountPercentage ? (
            <p>
              <span className="text-muted text-decoration-line-through">
                ${product.price}
              </span>
              <span className="text-danger fw-bold">
                {" "}
                $
                {(
                  product.price *
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}{" "}
                ({product.discountPercentage}% off)
              </span>
            </p>
          ) : (
            <p>${product.price}</p>
          )}
           <button className="btn btn-outline-dark" onClick={addToCartHandler}>
            <i className="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
