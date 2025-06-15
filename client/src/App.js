import React, {useState, useEffect} from "react";
import { Fab, Drawer, Box, Typography, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import NavBar from "./components/NavBar";
import {Route, Routes} from 'react-router-dom';
import axios from "axios";
import HomePage from "./Home";
import ShopPage from "./CustomerView/Shop";
import ShopOwnerPage from "./ShopOwnerView/ShopOwner";
import Login from "./components/Login";
import UserDashboard from "./CustomerView/Dashboard";
import ShopDashboard from "./ShopOwnerView/Dashboard";
import ProductPage from "./CustomerView/Product";
import CategoryPage from "./CustomerView/Category";
import Register from "./components/Register";
import CartPage from "./CustomerView/Cart";
import Bulks from "./CustomerView/Bulks";
import Checkout from "./CustomerView/Checkout";

const App = () => {
  return (
    <div>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route path='/shops/:id' element={<ShopPage/>} />
          <Route path='/shop-owners/:id' element={<ShopOwnerPage/>} />
          <Route path='/categories/:id' element={<CategoryPage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/customerview/dashboard' element={<UserDashboard/>} />
          <Route path='/shopownerview/dashboard' element={<ShopDashboard/>} />
          <Route path='/products/:id' element={<ProductPage/>} /> 
          <Route path='/cart' element={<CartPage/>} /> 
          <Route path='/bulks' element={<Bulks/>} /> 
          <Route path='/checkout' element={<Checkout/>} /> 
        </Routes>
    </div>
  )
}

export default App