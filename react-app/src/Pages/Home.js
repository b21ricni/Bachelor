import { useState } from "react";

function Home(){
  const [searchWord, setSearchWord] = useState("")


  function handleSubmit(e){
    e.preventDefault()
    console.log("btn pressed")
    console.log("Form submitted");
    console.log("Search word:", searchWord);
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