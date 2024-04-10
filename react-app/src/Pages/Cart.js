import React, { useState, useEffect } from "react";

const baseUrl = "http://localhost/Bachelor/react-app/";

function Cart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    try {
      const products = await fetch(baseUrl + "php/getCart.php");
      const data = await products.json();
      setProducts(data); // Set the products array in your state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {products.map((product) => (
          <li key={product.ID}>
            <img src={product.Image}></img>
            <strong>{product.Name}</strong>
            <p>${product.Price}</p>
            <p>{product.Description}</p>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;