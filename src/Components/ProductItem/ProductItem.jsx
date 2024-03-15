import React, { useContext } from "react";
import { CartContext } from "../../CONTEXT/CartContext";
import style from "./ProductItem.module.css";
import { wisheListContext } from '../../CONTEXT/WishelisteContext'
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProductItem({ product }) {
  const { addProductToCart } = useContext(CartContext);
  async function addProduct(id) {
    console.log(id);
    let { data } = await addProductToCart(id);

    if (data.status === "success") {
      toast.success(data.message, {
        position: "bottom-right",
      });
    }
  }

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
    <div key={product._id} className="col-md-2">
      <div className="product cursor-pointer rounded-3 p-3 position-relative">
        <Link to={`/productdetails/${product._id}`}>
          <div>
            <img src={product.imageCover} className="w-100" alt="" />
          </div>
          <span className="text-main">{product.category.name}</span>
          <h5 className="my-2 fw-bold">
            {" "}
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h5>
          <div className="priceDetails d-flex justify-content-between my-3">
            <div>{product.price} EGP</div>
            <div>
              <i className="fa-solid fa-star rating-color"></i>
            </div>
          </div>
        </Link>
        <button
          className="btn bg-main w-100 text-white"
          onClick={() => {
            addProduct(product.id);
            // console.log("bl7");
          }}
        >
          Add To Cart
        </button>

        <button onClick={()=>addProductToWishlist(product._id)}>wishlist </button>
        
        {/* <WishList /> */}

        {/* <i className="fa-solid fa-heart bg-red position-absolute top-0 end-0 mt-4 pe-4 fs-5"></i> */}
        <i className="fa-regular fa-heart position-absolute top-0 end-0 mt-4 pe-4 fs-5"></i>

        {/* <i
          onClick={() => {
            {
              wishlist ? (
                <i className="fa-solid fa-heart bg-red position-absolute top-0 end-0 mt-4 pe-4 fs-5"></i>
              ) : (
                <i className="fa-regular fa-heart position-absolute top-0 end-0 mt-4 pe-4 fs-5"></i>
              );
            }
          }}
        ></i> */}
      </div>
    </div>
  );
}
