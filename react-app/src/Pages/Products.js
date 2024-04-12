import React, { useState, useEffect } from "react";

const baseUrl = "http://localhost/Bachelor/react-app/";

function Products() {
  const [products, setProducts] = useState([])
  const [searchWord, setSearchWord] = useState("")

  const handleInputChange = (e) => {
    setSearchWord(e.target.value)
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    try {
      const products = await fetch(baseUrl + "php/getProducts.php");
      const data = await products.json();
      setProducts(data); // Set the products array in your state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  function addSearch(){
    // Send search value to getProducts
    fetch(baseUrl + "php/getProducts.php", {
      method: "POST",
      body: JSON.stringify({ searchWord }), // Convert to JSON
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Search results:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error sending data to PHP:", error);
      });
  }

  function addCartProduct(ID) {
    fetch(baseUrl + "php/addCartProduct.php", {
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
        console.log("Added:", data);
      })
      .catch((error) => {
        console.error("Error sending data to PHP:", error);
      });
  }

  function handleSubmit(e){
    e.preventDefault()

    addSearch()
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="searchInput">Search for product</label>
          <input className="input-search-prduct" onChange={handleInputChange} />
          <button className="btn-search-product" type="submit">Search</button>
        </form>
      </div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.ID}>
            <img src={product.Image}></img>
            <strong>{product.Name}</strong>
            <p>${product.Price}</p>
            <p>{product.Description}</p>
            <button onClick={() => addCartProduct(product.ID)}>Buy</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;