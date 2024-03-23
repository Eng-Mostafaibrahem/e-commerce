import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { Helmet } from "react-helmet";
import { CartContext } from "../../CONTEXT/CartContext";
import Loader from "../Loader/Loader";
import { Link } from 'react-router-dom';

export default function Cart() {
  const { getLoggedCard, countCart, deletProductFromCart } =
    useContext(CartContext);
  const [product, setProducts] = useState([]);
  const [response, setresponse] = useState([]);
  const [numOfCartItems, setnumOfCartItem] = useState("");
  const [loading, setLoading] = useState(true);


  async function cartProducts() {
    let { data } = await getLoggedCard();
    if (data.message !== "success") setLoading(false);
    setProducts(data.data.products);
    setresponse(data.data);
    setnumOfCartItem(data.numOfCartItems);
  }
  async function updateCount(id, count) {
    let { data } = await countCart(id, count);
    setProducts(data.data.products);
  }

  async function remove(id) {
    const { data } = await deletProductFromCart(id);
    console.log(data);
    setProducts(data.data.products);
    setnumOfCartItem(data.numOfCartItems);
    setresponse(data.data.totalCartPrice);
  }




  useEffect(() => {
    cartProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="container bg-main-light ">

        {loading ?
          <Loader /> : <>
            <h1>ShopCart :</h1>
            <div className="row gy-3 p-2 m-4  align-items-center">
              <div className="d-flex justify-content-between">
                <p className="text-main">totla Cart : {numOfCartItems}</p>
                <p className="text-main">current mount:{response.totalCartPrice}</p>
              </div>
              {product.map((product) => {
                return (
                  <>
                    <div key={product.id} className="col-md-2 ">
                      <img
                        src={product.product.imageCover}
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
                            onClick={() => {
                              return remove(product.product.id);
                            }}
                          >
                            <i className="fa-solid fa-trash-can text-main mx-2"></i>
                            Remove
                          </h6>
                        </div>
                        <div className="col-md-3">
                          <button
                            className="btn bg-main text-white fs-5 "
                            onClick={() =>
                              updateCount(product.product.id, product.count + 1)
                            }
                          >
                            {" "}
                            +{" "}
                          </button>{" "}
                          <span className="text-main m-2 fs-5">
                            {" "}
                            {product.count}{" "}
                          </span>
                          <button
                            className="btn bg-main text-white fs-5 "
                            disabled={product.count === 1 ? "disable" : false}
                            onClick={() =>
                              updateCount(product.product.id, product.count - 1)
                            }
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

            <Link to={'chekout'} className="btn bg-main text-white"> CheckOut </Link>

          </>}
      </div>
    </>
  );
}
