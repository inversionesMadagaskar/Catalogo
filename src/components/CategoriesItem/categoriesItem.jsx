import React from 'react'
import { Link } from 'react-router-dom'
import "./CategoriesItem.css"


const CategoryItem = ({item}) => {
  return (
    <div className='CatItem'>
      <Link to={`/products/${item.cat}`} className='linkCatItem'>
        <div className='subCatItem'>
          <div className='containerImgCat'>
            <img className='imgCatItem' alt='' src={item.img} />
          </div>
          <p className='textCatItem'>{item.title}</p>
        </div>
      </Link>
    </div>
  )
}

export default CategoryItem