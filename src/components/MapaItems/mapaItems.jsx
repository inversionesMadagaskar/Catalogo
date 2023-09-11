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
    console.log("hola")
  };

  return (
    <Link to={`/products/${item.cat}`} className='linkMapa' onClick={handleClick}><div className='mapas'>
      <div className='subMapa'>
        <p className='textMap' >{item.cat}</p>
      </div>
    </div></Link>
  )
}

export default MapaItem