import axios from "axios";
import Product from "../../components/Product/Product";
import Right from "../../image/right-arrow.png";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { publicRequest } from "../../requestMethod";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ProductId.css";
import Pasar from "../../image/botonPasar.svg"
import Retroceder from "../../image/Retroceder.png"
import { Helmet } from "react-helmet";


const ProductId = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [indice, setIndice] = useState(0);
  const [showSlideLeftButton, setShowSlideLeftButton] = useState(true);
  const [showSlideRightButton, setShowSlideRightButton] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);  
  const sliderRefId = useRef(null);
  
  
  //Filtrar productos recomendados
    const filteredProducts = products.filter((producto) => {
      if (!producto.brand) {
        return false;
      }
    
      const currentProductTitleWords = product.brand.toLowerCase().split(" ");
      const otherProductTitleWords = producto.brand.toLowerCase().split(" ");
    
      // Verificar si al menos una palabra en el título del otro producto se parece a una palabra en el título del producto actual
      const hasSimilarWord = currentProductTitleWords.some((currentWord) => {
        return otherProductTitleWords.some((otherWord) => {
          return currentWord.includes(otherWord) || otherWord.includes(currentWord);
        });
      });

      const isSameProduct = producto._id === product._id;
    
      return hasSimilarWord && !isSameProduct;
    });
  
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

  const slideLeft = () => {
    const slider = sliderRefId.current;
    const newPos = slider.scrollLeft + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--slide-two'));
    slider.scrollTo({
      left: newPos,
      behavior: "smooth"
    });

    const lastImageIndex = product.img.length - 1;
    if (newPos >= lastImageIndex * parseInt(getComputedStyle(document.documentElement).getPropertyValue('--slide-two'))) {
      setShowSlideLeftButton(false);
    }
    setCurrentSlide(currentSlide + 1);
    setShowSlideRightButton(true);
  };

  const slideRight = () => {
    const slider = sliderRefId.current;
    const newPos = slider.scrollLeft - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--slide-two'));
    slider.scrollTo({
      left: newPos,
      behavior: "smooth"
    });
    setCurrentSlide(currentSlide - 1);
    setShowSlideLeftButton(true);
  };

  //Obtener productos por ID
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);
   
  //Obtener todos los productos
  useEffect(() => {
    const peticionGet = async () => {
      try {
        const response = await axios.get(`https://apimadagaskar-dev-nbgm.1.us-1.fl0.io/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    peticionGet();
  }, [product]);

  useEffect(() => {
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
    }
  }, []);
  
  //para mapear
  const productosStock = filteredProducts.filter((products) => products.stock > 0);
  const productosActual = productosStock.slice(indice, indice + 4);
  
  return (
    <>
      <Helmet>
          <meta property="og:title" content={product.title} />
          <meta property="og:description" content={product.description} />
          <meta property="og:image" content={product.image} />
          <meta property="og:url" content={window.location.href} />
      </Helmet>

      <div className="ProductIdCont">
        <div className="containerCatId">
          <Link to="/products/Todos" className="linkCatLineId">
            <p className="tituloCatId">Categorias</p>
          </Link>
          <img src={Right} className="rightIconId" alt=""/>
          <p className="tituloCatId colorSubTituloId">Producto</p>
        </div>
        <div className="ProductId">
          <div className="containerIdUno" >
            {product.img?.length > 1 ? (
              <>
              <div className="imgContId" ref={sliderRefId}>
                {product.img.map((item) => (
                    <img src={item} className="imgProductCarrId"  alt="" />
                ))}
                </div>
                <div className="slider-imgContId">
                  {currentSlide >= 1 && <button onClick={slideRight} className="botonSlider"><img src={Retroceder} className="slider-imgId" alt=""/></button>}
                  {showSlideLeftButton && <button onClick={slideLeft} className="botonSlider"><img src={Pasar} className="slider-imgId" alt=""/></button>}
                </div>
              </>
              ) : (
              <img src={product.img} className="imgProductId" alt="" />
            )}
          </div>
          <div className="containerIdDos">
            <div className="containerTextId">
              <div className="textContainerId">
                <h1 className="titleProductId">{product.title}</h1>
                <p className="subtitleProductId">{product.subtitle}</p>
                <p className="descProductId">{product.desc}</p>
                {product.comp && product.comp.map((item) => (
                  <li key={item} className="compProductId">{item}</li>
                ))}
                <p className="priceProductId">{product.price}$</p>
                <p className="priceTwoProductId">{product.priceTwo}</p>
                <Link to={`https://api.whatsapp.com/send?phone=584244369887&text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20${product.title}%20${product.subtitle}`} target="_blank" className="linkId"><button className="dispoButtonProductId">Preguntar disponibilidad</button></Link>
                <p className="dispoProductId">Precio sujeto a cambio</p>
              </div>
          </div>
          <div className="containerSelectId">
            <p className="selectTituloId">Presentacion: </p>
            <select className="selectId">
              {product.size?.map((obj) => (
                <option value="obj" className="optionId">
                  {obj}
                </option>
              ))}
            </select>
          </div>
          <div className="containerSelectId">
            <p className="selectTituloId">Caracteristica: </p>
            <select className="selectId">
              {product.colorFlavor?.map((obj) => (
                <option value="obj" className="optionId">
                  {obj}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="ProductSeId">
        {indice !== 0 && <MdChevronLeft className="slidericon-leftId" onClick={retroceder} />}
          {productosActual.map((item) => (  
            <Product item={item} key={item.id}/>
          ))}
        {indice + 4 < filteredProducts.length && (<MdChevronRight className="slidericon-rightId" onClick={avanzar} />)}
      </div>
    </div>
    </>
);
};

export default ProductId;