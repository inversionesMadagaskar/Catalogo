import React from 'react'
import "./RecomendItem.css"
import { Link } from 'react-router-dom'

const RecomendItem = ({item}) => {

  return (
    <Link to={`/product/${item._id}`} className='linkRecomend'>
      <div className='contornoRecomend'>
        <div>
          <img className='imgRecomend' src={item.img[0]} alt=''></img>
          <div className='textRecomend'>
            <p className='titleRecomend'>{item.title}</p>
            <p className='descRecomend'>{item.subtitle}</p>
            <p className='priceRecomend'>{item.price}$</p>
            <p className='priceRecomendAntes'>{item.precioSinOferta}$</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RecomendItem