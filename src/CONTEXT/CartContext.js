import axios from "axios";
import { createContext } from "react";


let headers = { token: localStorage.getItem("Token") };
function addProductToCart(id) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId: id,
      },
      {
        headers,
      }
    )
    .then((response) => response) ///success
    .catch((err) => err); //failed
}
function getLoggedCard() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers,
    })
    .then((response) => response)
    .catch((err) => err);
}

function countCart(id,count) {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count },
      { headers }
    )
    .then((response) => response)
    .catch((err) => err);
}

function deletProductFromCart(id) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
    .then((response) => response)
    .catch((err) => err);
}

export const CartContext = createContext();
export default function CartContextProvider(props) {
  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedCard,
        countCart,
        deletProductFromCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
