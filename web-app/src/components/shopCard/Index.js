import React, { useEffect, useState, useContext } from "react";
import "./style.css";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { MyContext } from "../../App";

const ShopCard = (props) => {
  const [productData, setProductData] = useState();
  const [isAdded, setIsadded] = useState(false);

  const context = useContext(MyContext);

  useEffect(() => {
    setProductData(props.item);
  }, [props.item]);

  const setProductCat = () => {
    sessionStorage.setItem("parentCat", productData.parentCatName);
    sessionStorage.setItem("subCatName", productData.subCatName);
  };

  const addToCart = (item) => {
    context.addToCart(item);
    setIsadded(true);
  };

  return (
    <div className="productThumb" onClick={setProductCat}>
      {props.tag !== null && props.tag !== undefined && (
        <span className={`badge ${props.tag}`}>{props.tag}</span>
      )}

      {productData !== undefined && (
        <>
          <Link to={`/product/${productData.id}`}>
            <div className="imgWrapper">
              <div className="p-4 wrapper mb-3">
                <img
                  src={productData.catImg + "?im=Resize=(420,420)"}
                  className="w-100"
                />
              </div>
            </div>
          </Link>

          <div className="info">
            <h4 className="title">
              <Link>{productData.productName.substr(0, 50) + "..."}</Link>
            </h4>
            <Rating
              name="half-rating-read"
              value={parseFloat(productData.rating)}
              precision={0.5}
              readOnly
            />

            <Button className="w-100 transition mt-3">
              <ShoppingCartOutlinedIcon />
              See More
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShopCard;
