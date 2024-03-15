import React from 'react'
import style from "./Loader.module.css"
import { Puff } from "react-loader-spinner";


export default function Loader() {

  return (
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

  )
}

