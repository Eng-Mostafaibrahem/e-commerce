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

export const wisheListContext = createContext();

export default function WisheListContextProvider(props) {
  const [wishlist, setWishlist] = useState(null);

  return (
    <wisheListContext.Provider
      value={{
        addToWishlist,
        wishlist,
        setWishlist,
      }}
    >
      {props.children}
    </wisheListContext.Provider>
  );
}
