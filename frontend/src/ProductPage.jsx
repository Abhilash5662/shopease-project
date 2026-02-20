import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductPage.css";

function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [adding, setAdding] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadProduct();
    loadCart();
  }, [id]);


  const loadProduct = () => {
    setLoading(true);

    fetch("http://127.0.0.1:8000/api/products/")
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === Number(id));
        setProduct(found);
        setLoading(false);
      })
      .catch(err => {
        console.error("Product Error:", err);
        setLoading(false);
      });
  };


  const loadCart = () => {
    fetch("http://127.0.0.1:8000/api/cart/")
      .then(res => res.json())
      .then(data => setCartCount(data.items?.length || 0))
      .catch(err => console.error("Cart Error:", err));
  };


  const addToCart = () => {
    if (!product) return;

    setAdding(true);

    fetch("http://127.0.0.1:8000/api/cart/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: product.id }),
    })
      .then(res => res.json())
      .then(() => {
        loadCart();
        setAdding(false);
      })
      .catch(err => {
        console.error("Cart Error:", err);
        setAdding(false);
      });
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (!product) return <div className="loading">Product not found</div>;

  return (
    <div className="product-page">


      <header className="navbar">
        <Link to="/" className="logo">ShopEase</Link>

        <nav className="nav-items">
          {user ? (
            <Link to="/profile">My Account</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}

          <Link to="/cart" className="cart">
            Cart ({cartCount})
          </Link>
        </nav>
      </header>


      <div className="product-container">


        <div className="product-image">
          <img
            src={`http://127.0.0.1:8000${product.image}`}
            alt={product.title}
          />
        </div>


        <div className="product-details">

          <h1>{product.title}</h1>

          <p className="price">₹{product.price}</p>

          <div className="divider"></div>

          <h3>About this item</h3>
          <p className="description">{product.description}</p>

          <button onClick={addToCart} disabled={adding}>
            {adding ? "Adding..." : "Add to Cart"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductPage;