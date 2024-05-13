import React, { useState, useEffect } from "react";
import "./Cart.css"

const baseUrl = "http://localhost/Bachelor/react-app/"
const imgUrl = "http://localhost/Bachelor/react-app/images/"

function Cart() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, []);
  
  const fetchProducts = async () => {
    const products = await fetch(baseUrl + "php/getCart.php")
    const data = await products.json()
    setProducts(data);
  };

  function deleteCartProduct(ID) {
    fetch(baseUrl + "php/deleteCartProduct.php", {
      method: "POST",
      body: JSON.stringify({ ID }), // Convert to JSON
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    setProducts((prevProducts) => prevProducts.filter((p) => p.ID !== ID))
  }

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {products.map((product) => (
          <li key={product.ID}>
            <img className="prodImg" src={imgUrl + "Bach - Copy (" + product.Picture + ").png"}></img>
            <strong>{product.Name}</strong>
            <p>${product.Price}</p>
            <p>{product.Description}</p>
            <button class="btn-remove-product" onClick={() => deleteCartProduct(product.ID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;