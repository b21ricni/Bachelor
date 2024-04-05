import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ecart from "./Pages/Cart";
import Products from "./Pages/Products";
import Home from "./Pages/Home";
import Layout from "./Pages/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Ecart" element={<Ecart />} />
          <Route path="Products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
