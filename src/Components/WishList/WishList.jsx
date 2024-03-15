import React, { useContext, useEffect, useState } from "react";
import style from "./WishList.module.css"
import { wisheListContext } from '../../CONTEXT/WishelisteContext'
import { Helmet } from "react-helmet";
import { CartContext } from "../../CONTEXT/CartContext";

export default function WishList() {

  const [product, setProducts] = useState([]);
  const [response, setresponse] = useState([]);
  const [numOfWishListItems, setnumOfWishListItem] = useState("");



  const{addToWishlist ,setWishlist,wishlist}=useContext(wisheListContext)
  async function addProductToWishlist (id){
    let{data}=await addToWishlist(id)
    console.log(data.data)
    setWishlist(data.data);
    localStorage.setItem("WishList",data.data)
    // console.log(wishlist);
    let flag =data.data.includes(id);
    if(flag)console.log("product already in your wishlist");
    console.log("hello from wishlist");
      if (data.status === "success" && flag ) {
         toast.error("product already in your wishlist", {
          position: "bottom-right",
        });
    }
    

  }


  return (
    <>
      <Helmet>
        <title>WishList</title>
      </Helmet>
      <div className="container bg-main-light ">
        <h1>WishList :</h1>
        <div className="row gy-3 p-2 m-4  align-items-center">
          <div className="d-flex justify-content-between">
            <p className="text-main">totla WishList : {numOfWishListItems}  </p>
            <p className="text-main">current mount:{response.totalCartPrice}</p>
          </div>
          {product.map((product) => {
            return (
              <>
                <div  key={product.id} className="col-md-2 ">
                  <img
                    src={product.map.imageCover}
                    alt={product.product.title}
                    className="w-100"
                  />
                </div>
                <div className="col-md-10  ">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="col-md-9">
                      <h4>
                        {product.product.title.split(" ").slice(0, 2).join(" ")}
                      </h4>
                      <h5 className="text-main my-3">
                        <span className="text-bg-main">{product.price}</span>
                      </h5>
                      <h6
                        className="cursor-pointer"
                        // onClick={() => {
                        //   return remove(product.product.id);
                        // }}
                      >
                        <i className="fa-solid fa-trash-can text-main mx-2"></i>
                        Remove
                      </h6>
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn bg-main text-white fs-5 "
                        // onClick={() =>
                        //   // updateCount(product.product.id, product.count + 1)
                        // }
                      >
                        {" "}
                        +{" "}
                      </button>{" "}
                      <span className="text-main m-2 fs-5">
                        {" "}
                        {/* {product.count}{" "} */}
                      </span>
                      <button
                        className="btn bg-main text-white fs-5 "
                        disabled={product.count === 1 ? "disable" : false}
                        // onClick={() =>
                        //   updateCount(product.product.id, product.count - 1)
                        // }
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            );
          })}
        </div>
      </div>
    </>
  );

}

