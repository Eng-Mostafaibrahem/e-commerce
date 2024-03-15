import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import TokenContextProvider, { TokenContext } from "./CONTEXT/TokenContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from "./CONTEXT/CartContext";
import WisheListContextProvider from "./CONTEXT/WishelisteContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WisheListContextProvider>
      <CartContextProvider>
        <TokenContextProvider>
          <App />
        </TokenContextProvider>
      </CartContextProvider>
    </WisheListContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
