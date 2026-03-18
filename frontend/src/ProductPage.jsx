import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductPage.css";

function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetch("https://shopease-project-1-6fip.onrender.com/api/products/")
      .then(res => res.json())
      .then(data => {
        const item = data.find(p => p.id === Number(id));
        setProduct(item);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    setAdding(true);

    fetch("https://shopease-project-1-6fip.onrender.com/api/cart/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ product_id: product.id })
    })
      .then(res => res.json())
      .then(() => setAdding(false));
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (!product) return <div className="loading">Product not found</div>;

  return (
    <div className="product-page">


      <header className="navbar">
        <Link to="/" className="logo">ShopZone</Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </header>


      <div className="product-wrapper">


        <div className="product-image">
          <img
            src={`https://shopease-project-1-6fip.onrender.com${product.image}`}
            alt={product.title}
          />
        </div>


        <div className="product-info">

          <h1>{product.title}</h1>

          <div className="rating">
            ⭐⭐⭐⭐☆ (120 reviews)
          </div>

          <p className="price">₹{product.price}</p>

          <p className="stock">In Stock</p>

          <div className="divider"></div>

          <h3>Product Description</h3>

          <p className="description">
            {product.description}
          </p>

        </div>


        <div className="purchase-box">

          <h2>₹{product.price}</h2>

          <p className="delivery">
            FREE delivery Tomorrow
          </p>

          <button
            className="cart-btn"
            onClick={addToCart}
            disabled={adding}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>

          <button className="buy-btn">
            Buy Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductPage;