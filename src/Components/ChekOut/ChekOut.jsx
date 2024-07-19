import React, { useContext, useState } from "react";
import style from "./ChekOut.module.css";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { CartContext } from "../../CONTEXT/CartContext";
export default function ChekOut() {
  // const [loading, setLoading] = useState(true);
  const {payment}=useContext(CartContext)

  async function checkoutPayment(values) {
    const {data} =await payment(values);
    // console.log(values);
    console.log(data);
    // console.log(data.session.url);
    window.location.href=data.session.url
  }

  let formik = useFormik({
    initialValues: {
      details:"",
      phone:"",
      city:"",
    },
    onSubmit: checkoutPayment,
  });

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <div className="container bg-main-light  p-4 mt-3 mb-3 ">
        {/* {loading ? (
          <Loader />
        ) : (
          <> */}
        <h1>checkout :</h1>
        <p className="text-main">totla element in Check Out :</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label for="" className="form-label">
              Details{" "}
            </label>
            <input
              type="text"
              name="details"
              id="details"
              className="form-control"
              value={formik.values.details}
              onChange={formik.handleChange}
            />
          </div>
         
          <div className="mb-3">
            <label for="" className="form-label">
              City{" "}
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className="form-control"
              value={formik.values.city}
              onChange={formik.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="" className="form-label">
              Phone{" "}
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="form-control"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          </div>

          <button className="btn bg-main text-white  "> pay </button>
        </form>
      </div>
    </>
  );
}
