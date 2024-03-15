import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import axios from "axios";
import Slider from "react-slick";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { CartContext } from "../../CONTEXT/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [detailsData, setData] = useState({});
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  const { addProductToCart } = useContext(CartContext);
  async function addProduct(id) {
    let { data } = await addProductToCart(id);
    if (data.status === "success")
      toast.success(data.message, {
        position: "bottom-right",
      });
  }

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function getproductDetails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );

    if (data.message !== "success") setLoading(false);
    setData(data.data);
  }

  useEffect(() => {
    getproductDetails();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="col-md-3">
              <Slider {...settings}>
                {detailsData.images.map((ele) => (
                  <div key={ele._id} className="item px-1">
                    <img src={ele} alt="product img" className="w-100 " />
                    <h5>{ele.name}</h5>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="col-md-9 align-self-center">
              <p>{detailsData.description}</p>
              <h5>{detailsData.category?.name}</h5>
              <div className="d-flex justify-content-between m-2">
                <h5>{detailsData.price} EGP</h5>
                <h5>
                  <i className="fa fa-star rating-color"></i>{" "}
                  {detailsData.ratingsAverage}
                </h5>
              </div>

              <button
                className="btn bg-main text-white w-100"
                onClick={() => {
                  addProduct(detailsData._id);
                }}
              >
                {" "}
                add to cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
