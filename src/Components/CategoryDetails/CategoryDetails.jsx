import React, { useEffect, useState } from "react";
import style from "./CategoryDetails.module.css"
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";

export default function CategoryDetails() {
  
  const [detailsData, setData] = useState({});
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  async function getCategoriesDetails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );

    if (data.message !== "success") setLoading(false);
    setData(data.data);
  }

  useEffect(() => {
    getCategoriesDetails();
  }, []);

  
  
  return (
    <div className="container mt-5">
    <div className="row">
      {loading ? (
        <Loader />
      ) : (
        <>
        
          <div className="col-md-3">
          
              <img
                src={detailsData.image}
                alt="product img"
                className="w-100 "
              />
        
            </div>
        
          <div className="col-md-9 align-self-center">
            <h3 className="text-center">{detailsData.name}</h3>

          </div>
        </>
      )}
    </div>
  </div>

    )
}

