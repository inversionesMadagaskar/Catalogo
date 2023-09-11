import axios from 'axios'
import Buscador from '../../image/barraLarga.svg'
import CategoriesCat from "../../components/CategoriesCat/categoriesCta"
import NoLupa from '../../image/lupa_no_encontrado.svg'
import Product from '../../components/Product/Product'
import React from 'react'
import Lupa from '../../image/lupa.svg'
import { MdChevronLeft,MdChevronRight } from 'react-icons/md';
import { useEffect, useState, useRef  } from "react"
import diacriticless from 'diacriticless';
import './Search.css'


const Search = () => {

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [indice, setIndice] = useState(0);
  const [resultados, setResultados] = useState(products);
  const inputRef = useRef(null);
  

  //setBusqueda y filtrar
  const handleChange=e=>{
    setBusqueda(e.target.value);
  }
  const onClick=e=>{
    filtrar(busqueda);
  }
  
  //Buscar al click Enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      filtrar(busqueda);
    }
  };
  
  //filtro de buscador
  const filtrar = (terminoBusqueda) => {
    const normalizedTerminoBusqueda = diacriticless(terminoBusqueda.toLowerCase());
  
    const resultadosBusqueda = product.filter((elemento) => {
      const titulo = diacriticless(elemento.title.toString().toLowerCase());
      const categorias = diacriticless(elemento.categories.toString().toLowerCase());
      const subtitulo = diacriticless(elemento.subtitle.toString().toLowerCase());
  
      return (
        titulo.includes(normalizedTerminoBusqueda) ||
        categorias.includes(normalizedTerminoBusqueda) ||
        subtitulo.includes(normalizedTerminoBusqueda)
      );
    });
  
    setProducts(resultadosBusqueda);
    setResultados(resultadosBusqueda.length > 0 ? resultadosBusqueda : 'no disponible');
    setIndice(0); // Reiniciar el valor de indice a 0
  };
  
  //Botones de Siguiente y Anterior
  const avanzar = () => {
    if (indice + 4 < products.length) {
      setIndice(indice + 4);
    }
  };
  const retroceder = () => {
    if (indice - 4 >= 0) {
      setIndice(indice - 4);
    }
  };
  
  //Obtener productos
  useEffect(() =>{
    const peticionGet=async()=>{
      await axios.get(`https://apimadagaskar-2r5v-dev.fl0.io/api/products`)
      .then(response=>{
        setProducts(response.data);
        setProduct(response.data);
      }).catch(error=>{
        console.log(error);
      })
    }
    peticionGet()
  },[])

  //Mostrar busqueda
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //Para mapear
  const productosActuales = resultados.slice(indice, indice + 4);
  const productosActual = products.slice(indice, indice + 4);
  
  return (
    <div className='Search'>
      <div>
        <div className='ContSe'>
          <div>
            <img src={Buscador} className='barraSe' alt=''/>
            <input className='inputSe' type='text' value={busqueda} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef}></input>
            <img className='buscarIconoSe' src={Lupa} alt=''></img>
            <button className='buscarSe' onClick={onClick}><p className='textBuscarSe'>BUSCAR</p></button>
          </div>
        </div>
      </div>
      <p className='titleSe'>Resultados</p>
      {resultados && resultados !== 'no disponible' ? (
        <div className='ProductSe'>
          {indice !== 0 && <MdChevronLeft className="slidericon-leftSe" onClick={retroceder} />}
            {productosActual.map((item) => <Product item={item} key={item.id} />)}
          {indice + 4 < products.length && <MdChevronRight className="slidericon-rightSe" onClick={avanzar} />}
        </div>
      ) : resultados === 'no disponible' ? (
        <div className='contenedorNoSe'>
          <img className='lupaImgSe' src={NoLupa} alt=''></img>
          <p className='lupaTextSe'>No hay productos que coincidan con tu busqueda</p>
        </div>
      ) : (
        <div className='ProductSe'>
          {indice !== 0 && <MdChevronLeft className="slidericon-leftSe" onClick={retroceder} />}
            {productosActuales.map((item) => <Product item={item} key={item.id} />)}
          {indice + 4 < products.length && <MdChevronRight className="slidericon-rightSe" onClick={avanzar} />}
        </div>
      )}
        <h1 className='titleSer'>CATEGORIAS</h1>
        <CategoriesCat />
    </div>
  );
}


export default Search