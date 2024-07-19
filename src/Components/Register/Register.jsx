import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {

  let navigate=useNavigate();
  const [errorMessage,setErrorMessage]=useState("");
  const [isLoading,setIsLoading]=useState(false);

  async function callRegister(reqBody) {
    console.log(reqBody)
    setIsLoading(true)
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", reqBody)
      
      .catch((err) =>{
        setIsLoading(false)
        setErrorMessage(err.response.data.message);
      } )
      console.log(data);
    if (data.message === "success") {
      navigate("/login");
    }
    console.log(data);
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name is too short at least 3 charcter")
      .max(20, "name is to long maxmum is 20 character")
      .required(),
    email: Yup.string().email("email is not valid").required(),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalidPassword")
      .required("password is required"),

    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and repassword should be matched")
      .required("password is required"),

    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone")
      .required("phone is required"),
  });

  const regesterForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: callRegister,
  });
  return (
    <>
      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Register Now :</h2>
        {errorMessage ?
        <div className="alert alert-danger">{errorMessage}</div> :null}
        <form onSubmit={regesterForm.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="name" className="mb-1">
              FullName
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="enter your FullName"
              className="form-control"
              value={regesterForm.values.name}
              onChange={regesterForm.handleChange}
              onBlur={regesterForm.handleBlur}
            ></input>
          </div>
          {regesterForm.errors.name && regesterForm.touched.name ? (
            <div className="alert alert-danger">{regesterForm.errors.name}</div>
          ) : null}
          <div className="form-group mb-2">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="enter your email"
              className="form-control"
              value={regesterForm.values.email}
              onChange={regesterForm.handleChange}
              onBlur={regesterForm.handleBlur}
            ></input>
          </div>
          {regesterForm.errors.email && regesterForm.touched.email ? (
            <div className="alert alert-danger">
              {regesterForm.errors.email}
            </div>
          ) : null}
          <div className="form-group mb-2">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="enter your password"
              className="form-control"
              value={regesterForm.values.password}
              onChange={regesterForm.handleChange}
              onBlur={regesterForm.handleBlur}
            ></input>
          </div>
          {regesterForm.errors.password && regesterForm.touched.password ? (
            <div className="alert alert-danger">
              {regesterForm.errors.password}
            </div>
          ) : null}
          <div className="form-group mb-2">
            <label htmlFor="rePassword" className="mb-1">
              Repassword
            </label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              required
              placeholder="enter your rePassword"
              className="form-control"
              value={regesterForm.values.rePassword}
              onChange={regesterForm.handleChange}
              onBlur={regesterForm.handleBlur}
            ></input>
          </div>
          {regesterForm.errors.rePassword && regesterForm.touched.rePassword ? (
            <div className="alert alert-danger">
              {regesterForm.errors.rePassword}
            </div>
          ) : null}
          <div className="form-group mb-2">
            <label htmlFor="phone" className="mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="enter your phone"
              className="form-control"
              value={regesterForm.values.phone}
              onChange={regesterForm.handleChange}
              onBlur={regesterForm.handleBlur}
            ></input>
          </div>
          {regesterForm.errors.phone && regesterForm.touched.phone ? (
            <div className="alert alert-danger">
              {regesterForm.errors.phone}
            </div>
          ) : null}
          <button
            className="btn bg-main text-white d-block ms-auto m-2"
            type="submit"
          >
            {isLoading? <i className="fa fa-spinner fa-spin"></i>: "Register"}

           
          </button>
        </form>
      </div>
    </>
  );
}
