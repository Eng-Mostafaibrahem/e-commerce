import React from "react";
import style from "./Home.module.css";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
import Featuredproduct from "../Featuredproduct/Featuredproduct";
import Categoryslider from "../Categoryslider/Categoryslider";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <Categoryslider />
      <Featuredproduct />
    </>
  );
}
