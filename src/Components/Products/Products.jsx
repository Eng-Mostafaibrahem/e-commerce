import React, { useEffect, useState } from "react";
import style from "./Products.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loader from "../Loader/Loader";
import ProductItem from "../ProductItem/ProductItem";
import { useContext } from "react";
import { wisheListContext } from "../../CONTEXT/WishelisteContext";

export default function Products() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedProducts,setUpdatedProducts]=useState({})
  const {getWishlist}=useContext(wisheListContext)
  let [wishlistData,setWishlistData]=useState([]);

  async function wishlist(){
    const {data}=await getWishlist();
    // console.log("first",data);
    setWishlistData(data.data)
  }
  useEffect(()=>{
    wishlist();
    // console.log(wishlistData)
    // checkColor()
  },[])

  async function getProduct() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    if (data.message !== "success") setLoading(false);
    setProduct(data.data);  

  }


  useEffect(() => {
    getProduct();
  }, );

  return (
    <>
      <Helmet>
        <title>Product</title>
      </Helmet>
    {/* {console.log('7lata',updatedProducts)} */}
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
