import { useState } from "react";

const baseUrl = "http://localhost/Bachelor/react-app/";

function Home(){
  const [searchWord, setSearchWord] = useState("")


  function handleSubmit(e){
    e.preventDefault()

    console.log("Search word:", searchWord);

    // Send search value to getProducts
    fetch(baseUrl + "php/getProducts.php", {
      mode: 'no-cors',
      method: "POST",
      body: JSON.stringify({ searchWord }), // Convert to JSON
      headers: {
        "Content-Type": "application/json",
      },
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

  const handleInputChange = (e) => {
    setSearchWord(e.target.value)
  }

  return (
    <>
      <h1>Home</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="searchInput">Search for product</label>
          <input className="input-search-prduct" onChange={handleInputChange} />
          <button className="btn-search-product" type="submit">Search</button>
        </form>
      </div>
    </>
  );
}

export default Home;