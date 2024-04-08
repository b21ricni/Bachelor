import React, { useState, useEffect } from "react";

const baseUrl = "http://localhost/Bachelor/react-app/";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(baseUrl + "php/getProducts.php");
      const data = await response.json();
      setProducts(data); // Set the products array in your state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.ID}>
            <strong>{product.Name}</strong> - ${product.Price}
            <p>{product.Description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
