import LogoNav from '../../image/madagaskarLogoAColor.svg'
import { Link } from "react-router-dom";
import "./NavBar.css"

const NavBar = () => {    

    //Navegar al Id definido
    const handleClick = () => {
        const element = document.getElementById('categories');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return(
        <div className='MenuNav'>
            <Link className='linkNav' to='/'><img src={LogoNav} className='imgNav' alt='' /></Link>
            <div>
                <ul className='categoriesNav' >
                    <Link className='linkNav' to='/'><li className='listaNav'>INICIO</li></Link>
                    <Link className='linkNav' to='/products/Todos' onClick={handleClick}><li className='listaNav'>CATEGORIAS</li></Link>
                    <Link className='linkNav' to='/categoria/Romance'><li className='listaNav'>CONTACTO</li></Link>
                </ul>
            </div>
        </div>
    );

};

export default NavBar