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

  function deleteCartProduct(ID) {
    fetch(baseUrl + "php/deleteCartProduct.php", {
      method: "POST",
      body: JSON.stringify({ ID }), // Convert to JSON
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json(); // Parse the response
      })
      .then((data) => {
        console.log("Deleted product:", data);
        setProducts((prevProducts) => prevProducts.filter((p) => p.ID !== ID));
      })
      .catch((error) => {
        console.error("Error sending data to PHP:", error);
      });
  }
  

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
            <button onClick={() => deleteCartProduct(product.ID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;