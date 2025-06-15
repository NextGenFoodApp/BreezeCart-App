import React, { useState, useEffect } from "react";
import {
  Fab,
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
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
import AddProduct from "./ShopOwnerView/AddProduct";
import ProductDetailsPage from "./ShopOwnerView/ProductDetails";
import UpdateProductForm from "./CustomerView/UpdateProductForm";
import AdminDashboard from "./AdminView/AdminDashboard";
import AddShopPage from "./AdminView/AddShopPage";
import UsersPage from "./AdminView/components/UsersPage";
import ProductsPage from "./AdminView/components/ProductsPage";
import AdminShopsPage from "./AdminView/components/ShopsPage";
import AdminCategoriesPage from "./AdminView/components/CategoriesPage";
import UserBulk from "./components/UserBulk";
import UserInfo from "./components/UserInfo";
import UserProfile from "./AdminView/components/UserProfile";
import BulkProfile from "./AdminView/components/BulkProfile";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/shops/:id" element={<ShopPage />} />
        <Route path="/shop-owners/:id" element={<ShopOwnerPage />} />
        <Route path="/categories/:id" element={<CategoryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customerview/dashboard" element={<UserDashboard />} />
        <Route path="/adminview/dashboard" element={<AdminDashboard />} />
        <Route path="/adminview/add-shop" element={<AddShopPage />} />
        <Route path="/adminview/users" element={<UsersPage />} />
        <Route path="/adminview/users/:id" element={<UserProfile />} />
        <Route path="/adminview/bulks/:id" element={<BulkProfile />} />
        <Route path="/adminview/products" element={<ProductsPage />} />
        <Route path="/adminview/shops" element={<AdminShopsPage />} />
        <Route path="/adminview/catagories" element={<AdminCategoriesPage />} />
        <Route path="/shopownerview/dashboard" element={<ShopDashboard />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/bulks" element={<Bulks />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product/:id" element={<UpdateProductForm />} />
      </Routes>
    </div>
  );
};

export default App;
