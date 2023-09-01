import axios from 'axios';
import Product from '../Product/Product'
import React from 'react'
import Right from '../../image/right-arrow.png'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Products.css'

const Products = ( ) => {
  const location = useLocation()
  const cat = (location.pathname.split("/")[2])
  const [orden, setOrden] = useState('Orden');
  const [products, setProducts] = useState([]);
  const [indice, setIndice] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);

  //Opciones del filtro
  const opcionesOrden = [
    { value: 'Orden', label: 'Orden' },
    { value: 'Perros', label: 'Perro' },
    { value: 'Gatos', label: 'Gato' },
    { value: 'ascendente', label: 'Menor precio' },
    { value: 'descendente', label: 'Mayor precio' },
  ];

  //Funcion del filtro
  const ordenarProductos = (products, orden) => {
    let productosOrdenados = [...products];
    
    if (orden === 'ascendente') {
      productosOrdenados.sort((a, b) => a.price - b.price);
    } else if(orden === 'descendente'){
      productosOrdenados.sort((a, b) => b.price - a.price);
    }else if (orden === 'Perros' || orden === 'Gatos') {
      productosOrdenados = productosOrdenados.filter(
        (producto) => producto.categories.includes(orden)
      );
    }
    
    return productosOrdenados;
  };
  
  //Setear orden al cambiar el filtro
  const handleChangeOrden = (event) => {
    setOrden(event.target.value);
  };

  //Botones de Siguiente y Anterior
  const avanzar = () => {
    if (indice + 12 < productosFiltrados.length) {
      setIndice(indice + 12);
      setPaginaActual(paginaActual + 1);
    }

    //Navegar al ID definido
    const element = document.getElementById('categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const retroceder = () => {
    if (indice - 12 >= 0) {
      setIndice(indice - 12);
      setPaginaActual(paginaActual - 1);
    }

    //Navegar al ID definido
    const element = document.getElementById('categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  //Traer productos de mongo
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat ? `https://apimadagaskar-b588-dev.fl0.io/api/products?category=${cat}` : 'https://apimadagaskar-b588-dev.fl0.io//api/products'
        );
        setProducts(res.data);
        setPaginaActual(1); // Restablecer la página actual a 1
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    setIndice(0); // Volver a la primera página al cambiar de categoría
    setOrden('Orden'); // Restablecer el orden a "Orden"
    setPaginaActual(1);
  }, [cat]);

  //Para mapear
  const productosFiltrados = ordenarProductos(products, orden);
  const productosStock = productosFiltrados.filter((products) => products.stock > 0);
  const productosActuales = productosStock.slice(indice, indice + 12);

  return (
    <div className='ProductsPro'>
      <div className='OrdenPro'>
        <div className='containerCatPro'><Link to='/products/Todos'  className='linkCatLinePro'><p className="tituloCatPro">Categorias</p></Link><img src={Right} className='rightIconPro' alt=''/><p className='tituloCatPro colorSubTituloPro'>{cat}</p></div>
          <div className='filtroPro'>
            <p className='filtroTitlePro'>Ordenar por</p>
            <select className='filtroSelectPro' value={orden} onChange={handleChangeOrden}>
              {opcionesOrden.map((opcion) => (
                <option key={opcion.value} value={opcion.value} className='filtrOptionPro'>
                  {opcion.label}
                </option>
              ))} 
            </select>
          </div>
      </div>
      <div className='productsPro'>
          {productosActuales.map((producto) => (
            <Product item={producto} key={producto.id}/>
          ))}
      </div>
      <div className='PaginasPro'>
      {indice !== 0 && <button className='botonPro' onClick={retroceder} disabled={indice === 0}>Anterior
        </button>}
        <p className='paginasTextoPro'>
          {paginaActual} de {Math.ceil(productosStock.length / 12)}
        </p>
        {indice + 12 < productosFiltrados.length && (<button className='botonPro' onClick={avanzar} disabled={indice + 12 >= products.length}>
          Siguiente
        </button>)}
      </div>
    </div>
  )
}

export default Products