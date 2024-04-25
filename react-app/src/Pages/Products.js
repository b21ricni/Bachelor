import React, { useState, useEffect } from "react";
import "./Products.css";

const baseUrl = "http://localhost/Bachelor/react-app/"
const imgUrl = "http://localhost/Bachelor/react-app/images/"

function Products() {
  const [products, setProducts] = useState([])
  const [searchWord, setSearchWord] = useState("")
  

  const handleInputChange = (e) => {
    setSearchWord(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()

    addSearch()
  }

  useEffect(() => {
    fetchProducts()
  }, []);
  
  const fetchProducts = async () => {
    const products = await fetch(baseUrl + "php/getProducts.php")
    const data = await products.json()
    setProducts(data)
  };

  function addSearch(){
    fetch(baseUrl + "php/getProducts.php", {
      method: "POST",
      body: JSON.stringify({ searchWord }), // Convert to JSON
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      }
    })
    .then((response) => response.json())
    .then((data) => { setProducts(data) })
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
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="searchInput">Search for product</label>
          <input className="input-search-prduct"  id="searchInput" onChange={handleInputChange} />
          <button className="btn-search-product" id="btn-search-prodpage" type="submit">Search</button>
        </form>
      </div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.ID}>
            <img className="prodImg" src={imgUrl + product.Picture + ".png"}></img>
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