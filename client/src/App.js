import React from "react";
import NavBar from "./components/NavBar";
import {Route, Routes} from 'react-router-dom';
import HomePage from "./Home";
import ShopPage from "./CustomerView/Shop";
import Login from "./components/Login";
import UserDashboard from "./CustomerView/Dashboard";
import ShopDashboard from "./ShopOwnerView/Dashboard";

const App = () => {
  return (
    <div>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route path='/shops/:id' element={<ShopPage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/customerview/dashboard' element={<UserDashboard/>} />
          <Route path='/shopownerview/dashboard' element={<ShopDashboard/>} />
        </Routes>
    </div>
  )
}

export default App