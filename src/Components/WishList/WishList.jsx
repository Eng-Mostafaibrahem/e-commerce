import React, { useContext, useEffect, useState } from "react";
import style from "./WishList.module.css"
import { wisheListContext } from '../../CONTEXT/WishelisteContext'
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

export default function WishList() {

  const [products, setProducts] = useState([]);
  const [numOfWishListItems, setnumOfWishListItem] = useState("");
  const [loading, setLoading] = useState(true);


  const { addToWishlist, getWishlist,deletProductFromWishlist} = useContext(wisheListContext)
  async function addProductToWishlist(id) {
    let { data } = await addToWishlist(id)
    console.log(data)
    let flag = data.data.includes(id);
    if (flag) console.log("product already in your wishlist");
    console.log("hello from wishlist");
    if (data.status === "success" && flag) {
      toast.error("product already in your wishlist", {
        position: "bottom-right",
      });
    }


  }

  async function getDataWishList() {
    let { data } = await getWishlist();
    if (data.message !== "success") setLoading(false);
    console.log(data.data);
    setnumOfWishListItem(data.count);
    setProducts(data.data)


  }

  async function remove(id) {
    const { data } = await deletProductFromWishlist(id);

    setProducts(data.data.products);
    setnumOfWishListItem(data.numOfWishlistItems);
  }



  useEffect(() => {
    getDataWishList();
  }, [])
  return (
    <>
      <Helmet>
        <title>WishList</title>
      </Helmet>
      <div className="container bg-main-light ">
      {loading ? 
        <Loader />:<>
        <h1>WishList :</h1>
        <div className="row gy-3 p-2 m-4  align-items-center">
          <div className="d-flex justify-content-between">
            <p className="text-main">totla element in WishList : {numOfWishListItems}  </p>
          </div>
          {products.map((product) => {
            return (
              <>
                <div key={product.id} className="col-md-2 ">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-100"
                  />
                </div>
                <div className="col-md-10  ">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="col-md-9">
                      <h4>
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h4>
                      {console.log(product)}
                      <h5 className="text-main my-3">
                        <span className="text-bg-main">{product.price}</span>
                      </h5>
                      <h6
                        className="cursor-pointer"
                      onClick={() => {
                        return remove(product.id);
                      }}
                      >
                        
                        <i className="fa-solid fa-trash-can text-main mx-2"></i>
                        Remove
                      </h6>
                    </div>
                  
                  </div>
                </div>
                <hr />
              </>
            );
          })}
        </div>
          </>}
      </div>
    </>
  );

}

