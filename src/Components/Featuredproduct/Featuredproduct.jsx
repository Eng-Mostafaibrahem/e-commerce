import React, { useContext, useEffect, useState } from "react";
import style from "./Featuredproduct.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { CartContext } from "../../CONTEXT/CartContext";

export default function Featuredproduct() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const { addProductToCart, setNumOfCartItems } = useContext(CartContext);

  async function addProduct(id) {
    let { data } = await addProductToCart(id);
    if (data.status === "success") {
      toast.success(data.message, {
        position: "top-center",
      });
    } else
      toast.error(data.message, {
        position: "top-center",
      });

    console.log(data);
    setNumOfCartItems(data.numOfCartItems);
  }

  async function getdata() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    if (data.message !== "success") setLoading(false);
    setProducts(data.data);
  }

  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <div className="container my-5">
        <div className="row gy-5 ">
          {loading ? (
            <Loader />
          ) : (
            products.map((product) => {
              return (
                <div key={product.id} className="col-md-3 product p-3">
                  <div>
                    <img src={product.imageCover} alt="" className="w-100 " />
                  </div>
                  <h6 className="text-main">
                   }
                  </h6>
                  <h4>{product.category.name}</h4>
                  <div className="priceDetails d-flex justify-content-between my-3">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fa-solid fa-star rating-color"></i>
                    </span>
                  </div>
                  <button
                    className="btn bg-main w-100 text-white"
                    onClick={() => {
                      addProduct(product.id);
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
