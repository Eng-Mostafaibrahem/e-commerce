import React, { useContext } from "react";
import style from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { TokenContext } from "../../CONTEXT/TokenContext";
import { Button } from "bootstrap/dist/js/bootstrap.bundle";
export default function NavBar() {
  let navigate= useNavigate();
  let { token ,setToken } = useContext(TokenContext);
  console.log(token, "test");
  
  function logOut(){
    localStorage.removeItem("Token");
    setToken(null);
    navigate("/login");
    
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <Link className="navbar-brand" to={""}>
          <img src={logo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {token ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={""}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"products"}>
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"cart"}>
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"categories"}>
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"brands"}>
                  Brands
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"wishlist"}>
                  Wishlist
                </Link>
              </li>
            </ul>
          ) : null}

          <ul className="navbar-nav ms-auto">
            <li className="nav-item align-self-center">
              <i className="fa-brands fa-facebook fs-5 mx-1"></i>
              <i className="fa-brands fa-linkedin fs-5 mx-1"></i>
              <i className="fa-brands fa-instagram fs-5 mx-1"></i>
            </li>

            {token ? (
              <li className="nav-item">
                <button
                  className="nav-link active"
                  onClick={logOut}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"register"}
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"login"}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
