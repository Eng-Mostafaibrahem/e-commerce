import React from 'react'
import style from "./CategoryItem.module.css"
import { Link } from 'react-router-dom'

export default function CategoryItem({category}) {
  return (
<Link to={`/categorydetails/${category._id}`}>
<div class="card-group">
<div class="card cursor-pointer">
    <img src={category.image} class="card-img-top w-100" height={250} alt="..." />
    <div class="card-body">
      <h5 class="card-title">{category.name}</h5>
    </div>
  </div>
  </div>
  </Link>

  )
}

