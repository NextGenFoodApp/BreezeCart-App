import React from "react";
import NavBar from "./components/NavBar";
import {Route, Routes} from 'react-router-dom';
import HomePage from "./Home";
import ShopPage from "./CustomerView/Shop";

const App = () => {
  return (
    <div>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route path='/shops/:id' element={<ShopPage/>} />
        </Routes>
    </div>
  )
}

export default App