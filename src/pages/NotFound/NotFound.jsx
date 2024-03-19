import React from "react";
import style from "./NotFound.module.css";
import notFoundImg from "../../Assets/images/error.svg";
export default function NotFound() {
  return (
    
    <section className="container my-5">
      <img src={notFoundImg} alt="error image" className="w-75 " />
    </section>
  );
}
