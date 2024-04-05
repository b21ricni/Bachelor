import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Without Lazy Loading
//import Cart from "./Pages/Cart";
//import Products from "./Pages/Products";
//import Home from "./Pages/Home";
//import Layout from "./Pages/Header";

//With Lazy Loading
const Cart = React.lazy(() => import("./Pages/Cart"))
const Products = React.lazy(() => import("./Pages/Products"))
const Home = React.lazy(() => import("./Pages/Home"))
const Header = React.lazy(() => import("./Pages/Header"))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
