import React, { useEffect, useContext } from "react";
import Slider from "react-slick";
import "./index.css";

import Slide1 from "../../../assets/images/slider-1.png";
import Slide2 from "../../../assets/images/slider-2.png";

import { MyContext } from "../../../App";

const HomeSlider = () => {
  const context = useContext(MyContext);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: context.windowWidth > 992 ? true : false,
    autoplay: true,
  };

  return (
    <section className="homeSlider">
      <div className="container-fluid position-relative">
        <Slider {...settings} className="home_slider_Main">
          <div className="item">
            <img src={Slide1} className="w-100" />
            <div className="info mt-5">
              <h2>
                Don’t miss
                <br />
                Amazing
                <br />
                Grocery Deals
              </h2>
            </div>
          </div>
          <div className="item">
            <img src={Slide2} className="w-100" />
            <div className="info mt-5">
              <h2>
                Pick Now
                <br />
                Your Favourite
                <br />
                Add to Cart
              </h2>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default HomeSlider;
