import React, { useEffect, useState } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";
import CategoryItem from "./../CategoryItem/CategoryItem";

export default function Categories() {
  const [categories, SetCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCategories() {
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
    getCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="container">
        <div class="row row-cols-1 row-cols-md-3 g-4">
          {loading ? (
            <Loader />
          ) : (
            categories.map((category) => {
              return <CategoryItem category={category}></CategoryItem>;
            })
          )}
        </div>
      </div>
    </>
  );
}
