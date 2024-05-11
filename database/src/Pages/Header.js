import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/" id="btn-home-page">Home</Link>
          </li>
          <li>
            <Link to="Products" id="btn-prod-page">Products</Link>
          </li>
          <li>
            <Link to ="Cart" id="btn-cart-page">Cart</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Header;