import Banner from '../../components/Banner/Banner';
import CategoriesCat from "../../components/CategoriesCat/categoriesCta";
import Products from "../../components/Products/Products"
import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { useParams } from 'react-router-dom';

const ProductList = () => {
  const location = useLocation()
  const cat = (location.pathname.split("/")[2])
  const { category } = useParams();
  const categoriesRef = useRef(null);

  //Navegar al Ref
  useEffect(()=> {
    if(category === 'Todos' || 'Gatos' || 'Perros' || 'Alimentos' || 'Cepillos' || 'Farmacia' || 'Snacks' || 'Cosmeticos' || 'Juguetes' || 'Kennel' || 'Camas' || 'Platos' || 'Arena'){
      categoriesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  },[])

  return (
    <>
    <Banner />
    <div ref={categoriesRef} id="categories">
      <CategoriesCat/>
    </div>
    <Products cat={cat} />
    </>
  )
}

export default ProductList