import logo from './logo.svg';
import './App.css';
import Products from './Components/Products';
import ProductByCategory from './Components/ProductByCategories';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ProductDetails from './Components/ProductDetails';
import Cart from './Components/Cart';
import AppBar from './CommonComponents/AppBar'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppBar/>
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/category/:category' element={<ProductByCategory/>}/>
        <Route path="/product-details/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      </BrowserRouter>
    
    
    </div>
  );
}

export default App;
