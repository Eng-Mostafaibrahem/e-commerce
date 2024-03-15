import React from "react";
import style from "./Categoryslider.module.css";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Puff } from "react-loader-spinner";

export default function Categtyslider() {
  const [categories, SetCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
  };

  async function getCategoriesSlider() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    if (data.message !== "success") {
      setLoading(false);
    }
    console.log(data);

    SetCategories(data.data);
  }

  useEffect(() => {
    getCategoriesSlider();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Categories</h1>

        {loading ? (
          <div className="loading mx-auto w-25 m-auto">
            <Puff
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <Slider {...settings}>
            {categories.map((ele) => (
              <div key={ele._id} className="item px-1">
                <img
                  src={ele.image}
                  height={"200"}
                  alt="product img"
                  className="w-100 "
                />
                <h5>{ele.name}</h5>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
}
