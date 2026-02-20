import React, { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="products">
      {products.map(product => (
        <div key={product.id} className="card">
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>₹{product.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
