import axios from "axios";
import { createContext, useState } from "react";
import WishList from "./../Components/WishList/WishList";

let headers = { token: localStorage.getItem("Token") };
// let wishlist = { wishlist: localStorage.setItem("wishlist") };
function addToWishlist(id) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId: id },
      { headers }
    )
    .then((response) => response)
    .catch((err) => err);
}

function getWishlist() {
  return axios
    .get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { headers }
    )
    
    .then((response) => response)
    .catch((err) => err);



  }

function deletProductFromWishlist(id) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers })
    .then((response) => response)
    .catch((err) => err);
}
 

export const wisheListContext = createContext();

export default function WisheListContextProvider(props) {


  return (
    <wisheListContext.Provider
      value={{
        addToWishlist,
        getWishlist,
        deletProductFromWishlist,
      }}
    >
      {props.children}
    </wisheListContext.Provider>
  );
}
