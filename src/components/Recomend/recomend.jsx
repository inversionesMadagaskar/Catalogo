import RecomendItem from '../RecomendItem/RecomendItem.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './recomend.css'
import { useLocation } from 'react-router-dom';

const Recomend = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const scrollOnLoadRecomend = new URLSearchParams(location.search).get('scrollOnLoadRecomend') === 'true';

    useEffect(() => {
        if (scrollOnLoadRecomend) {
        const scrollToBasicSection = () => {
            const element = document.getElementById('recomend');
            if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            }
        };
        scrollToBasicSection();
        }
    }, [scrollOnLoadRecomend]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://apimadagaskar-dev-nbgm.1.us-1.fl0.io/api/products');
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => product.oferta === true);
    setFilteredProducts(filtered);
  }, [products]);

  console.log(products);
  console.log(filteredProducts);

  return (
    <div className='Reco'>
      <h1 className='titleReco' id='recomend'>PROMOCIONES</h1>
      <div className='RecomendReco'>
        {filteredProducts.map(item => (
          <RecomendItem item={item} key={item._id} />
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Recomend;