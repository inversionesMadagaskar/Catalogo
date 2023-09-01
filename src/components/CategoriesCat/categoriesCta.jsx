import React, { useState, useRef, useEffect } from 'react';
import { categories } from '../../data';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import './categoriesCat.css';

const CategoriesCat = () => {

  const [sliderPos, setSliderPos] = useState(0);
  const sliderRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  const showLeftIcon = sliderPos > 0;
  const showRightIcon = sliderPos + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--slide-amount')) < sliderWidth;

  const location = useLocation();

  const onClick = (category) => {
    setActiveCategory(category);
    localStorage.setItem('sliderPos', sliderPos);
  };
  
  //Desplazar categorias a la derecha o izquiera
  const slideLeft = () => {
    const slider = sliderRef.current;
    const newPos = sliderPos - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--slide-amount'));
    slider.scrollLeft = newPos;
    setSliderPos(newPos);
  };

  const slideRight = () => {
    const slider = sliderRef.current;
    const newPos = sliderPos + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--slide-amount'));
    slider.scrollLeft = newPos;
    setSliderPos(newPos);
  };

  useEffect(() => {
    const storedCategory = localStorage.getItem('activeCategory');
    if (storedCategory) {
      setActiveCategory(storedCategory);
    }
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    const category = currentPath.split('/products/')[1];
    setActiveCategory(category);
  }, [location.pathname]);
  
  //Realizar el scroll con Ref
  useEffect(() => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.scrollWidth;
      setSliderWidth(sliderWidth);

      const currentPos = sliderRef.current.scrollLeft;
      setSliderPos(currentPos);
    }
  }, []);

  return (
    <div className="CategoriesCat">
      {showLeftIcon && <MdChevronLeft size={40} className="slider-icon-leftCat"  onClick={slideLeft} />}
        <div id="sliderCat" ref={sliderRef}>
          {categories.map((item) => {
            return (
              <Link to={`/products/${item.cat}`} className="linkCat" key={item._id} onClick={() => onClick(item.cat)}>
                <div className={`slider-cardCat ${activeCategory === item.cat ? 'active' : ''}`} data-category={item.cat}>
                  <div className="slider-card-imageCat" ><img className='imgCat' src={item.img} alt=''/></div>
                  <p className="slider-card-titleCat">{item.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      {showRightIcon && <MdChevronRight size={40} className="slider-icon-rightCat" onClick={slideRight} />}
    </div>
  );
};

export default CategoriesCat;

