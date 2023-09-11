import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import End from "./components/End/End";
import Footer from "./routes/Footer/Footer";
import Home from "./routes/Home/Home"
import Mapa from "./components/Mapa/Mapa";
import NavBar from "./routes/NavBar/NavBar";
import ProductList from "./routes/ProductsList/productsList";
import ProductID from "./routes/ProductID/ProductID";
import Search from './routes/Search/Search.jsx'


const App = () => {
  return (
    <Router>
      <NavBar />
        <Routes>
          <Route path={'/Catalogo'} element={<Home />} />
          <Route path={'/'} element={<Home />} />
          <Route path='/products/:category' element={<ProductList />} />
          <Route path={'/product/:id'} element={<ProductID />} />
          <Route path='/buscador' element={<Search />} />
        </Routes> 
      <Footer />
      <Mapa />
      <End />
    </Router>
  );
};

export default App;