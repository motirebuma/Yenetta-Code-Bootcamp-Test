import './App.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import Products from './pages/Products';
import InStock from './pages/Stock';
import OutStock from './pages/OutStock';
// import {Route, Routes, BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className='App'>
     <BrowserRouter>
        <Routes>
            {/* index */}
            <Route index element={
              < Products />
            }/>

            <Route path={'/products'} element={
                < Products />
            } />
            <Route path={'/instock'} element={
                < InStock />
            } />
            <Route path={'/out_of_stock'} element={
                < OutStock />
            } />
  
            {/* edit product */}
            <Route path={'/edit_product/:productID'} element={
                <EditProduct />
            } />

            {/* create product */}

            <Route path={'/create_product'} element={
                < CreateProduct />
            } />
            {/*  */}
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
