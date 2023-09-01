import React from 'react'
import './mapa.css'
import { Link } from 'react-router-dom'


const MapaItem = ({item}) => {

  //Navegar al Id definido
  const handleClick = () => {
    const element = document.getElementById('categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='mapas'>
      <div className='subMapa'>
        <Link to={`/products/${item.cat}`} className='linkMapa' onClick={handleClick}><p className='textMap'>{item.title}</p></Link>
      </div>
    </div>
  )
}

export default MapaItem