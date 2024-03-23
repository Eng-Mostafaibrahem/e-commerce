import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TokenContext } from "../../CONTEXT/TokenContext";

export default function Login() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { setToken } = useContext(TokenContext);
  async function callLogin(reqBody) {
    console.log(reqBody);
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", reqBody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
        console.log(err);
      });
    if (data.message === "success") {
      //login success
      localStorage.setItem("Token", data.token);
      setToken(data.token);
      navigate("/");
    }
    console.log(data);
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("invalid email").required(),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid Password")
      .required("password is required"),
  });

  const regesterForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: callLogin,
  });
  return (
    <>
      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Login Now :</h2>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}
        <form onSubmit={regesterForm.handleSubmit}>
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
          <button
            disabled={
              (!regesterForm.values.email || !regesterForm.values.password) ||
              (regesterForm.errors.email || regesterForm.errors.password)
                ? "disabled"
                : false
            }
            className="btn bg-main text-white d-block ms-auto m-2"
            type="submit"
          >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
