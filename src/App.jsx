import React, { Fragment } from 'react';
import './App.css'
import { Routes, Route } from "react-router-dom";
import ProductList from './pages/productList'; 
import ProductDetails from './pages/productdetails';
import CartList from './pages/cartlist';


function App() {

  return (
  <Fragment>
    <Routes>
      <Route path="/product-list" element={<ProductList/>}/>
      <Route path='/product-details/:id' element={<ProductDetails/>}/>
      <Route path='/cart' element={<CartList/>}/>
    </Routes>
  </Fragment>
  )
}

export default App
