import React, { useState, useEffect } from "react";

const baseUrl = "http://localhost/Bachelor/react-app/";

function Products() {
  const [products, setProducts] = useState([])
  const [searchWord, setSearchWord] = useState("")

  function conlog(){
    console.log(searchWord)
  }

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
        // confirm conversion works
        console.log("Search results:", data);
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
            <button>Add to cart</button>
          </li>
        ))}
      </ul>
      <p>bugtesting</p>
      <button className="btn-search-product" type="submit" onClick={conlog}>conlog</button>
    </div>
  );
}

export default Products;