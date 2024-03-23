import React, { useState } from "react";
import style from "./ChekOut.module.css";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { useFormik } from "formik";
export default function ChekOut() {
  // const [loading, setLoading] = useState(true);

  function checkoutPayment(values) {
    console.log(values);
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
      <div>ChekOut</div>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <div className="container bg-main-light  p-4 ">
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

        {/* </> */}
        {/* )} */}
      </div>
    </>
  );
}
