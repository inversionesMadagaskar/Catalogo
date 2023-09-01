import Buscador from '../../image/barraBusqueda.svg'
import imgBanner from "../../image/Banner.png"
import Lupa from '../../image/lupa.svg'
import React from 'react'
import { Link } from 'react-router-dom';
import "./Banner.css"

const Banner = () => {
  return (
      <div>
        <div className='banner'>
          <div>
            <img className='imgBanner' src={imgBanner} alt=''></img>
            <img src={Buscador} className='barraBanner' alt=''/>
            <Link to='/buscador'><input className='inputBanner'></input></Link>
            <img className='buscarIconoBanner' src={Lupa} alt=''></img>
            <button className='buscarBanner'><p className='textBuscarBanner'>BUSCAR</p></button>
          </div>
        </div>
      </div>
  );
}


export default Banner