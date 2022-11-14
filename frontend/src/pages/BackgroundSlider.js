import React from "react";
import "./BackgroundSlider.css";
import imageSlide from "./data";
import { useEffect, useState } from "react";
import TestImage from "../images/i1.webp";
const BackgroundSlider = () => {
  const [currentState, setCurrentState] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentState === 5) {
        setCurrentState(0);
      } else {
        setCurrentState(currentState + 1);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentState]);
  const bgImageStyle = {
    // backgroundImage: `url(${imageSlide[currentState].url})`,
    backgroundImage: `url(${TestImage})`,
    backgroundPosition: "centre",
    backgroundSize: "cover",
    height: "100%",
  };
  const gotoNext = (currentState) => {
    setCurrentState(currentState);
  };
  return (
    <div className="countiner-style">
      <div style={bgImageStyle}></div>
      <div className="description">
        <div>
          <h1>{imageSlide[currentState].title}</h1>
          <p>{imageSlide[currentState].body}</p>
        </div>
        <div className="carousel-boult">
          {imageSlide.map((imageSlide, currentState) => (
            <span key={currentState} onClick={() => gotoNext(currentState)}>
              1
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BackgroundSlider;
