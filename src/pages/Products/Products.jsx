import React, { useEffect, useState } from "react";
import style from "./Products.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loader from "../Loader/Loader";
import ProductItem from "../ProductItem/ProductItem";

export default function Products() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getProduct() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    if (data.message !== "success") setLoading(false);
    console.log(data.data);
    setProduct(data.data);
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Helmet>
        <title>Product</title>
      </Helmet>
      <div className="container my-5">
          <div className="row gy-2 ">
       
      {loading ? 
        <Loader />:products.map((product) => 
               <ProductItem product={product}/>
              
              )}
            
          </div>
        </div>
    </>
  );
}
