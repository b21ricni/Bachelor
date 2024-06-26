import React, { useState } from "react";

const baseUrl = "http://localhost/Bachelor/database/"

function Home(){
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [picture, setPicture] = useState("")
  const [price, setPrice] = useState("")

  function handleSubmit(e){
    e.preventDefault()

    addDBprod()
  }

  function addDBprod(){
    fetch(baseUrl + "php/createItem.php", {
      method: "POST",
      body: JSON.stringify({ name, description, picture, price }), // Convert to JSON
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      }
    })
  }

  //This is bad practice
  //Please don't do this in developed code
  //The person checking the code will cry
  //This code is intentionally not optimized so i have more time doing experiments
  //Have a nice day :)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Create product</label>
        <input 
          className="input-search-prduct"  
          id="nameInput" 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          className="input-search-prduct"  
          id="priceInput" 
          onChange={(e) => setPrice(e.target.value)} 
        />
        <input 
          className="input-search-prduct"  
          id="descriptionInput" 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <input 
          className="input-search-prduct"  
          id="pictureInput" 
          onChange={(e) => setPicture(e.target.value)} 
        />
        <button className="btn-add-product" id="btn-add" type="submit">Add</button>
      </form>
    </div>
  );
}

export default Home;