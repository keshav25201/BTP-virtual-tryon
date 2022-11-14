import Carousel from "react-bootstrap/Carousel";
import { React } from "react";
import I1 from "../images/i1.webp";
import I2 from "../images/i2.webp";
import I3 from "../images/i3.webp";
import I4 from "../images/i4.webp";
import I5 from "../images/i5.webp";
import I6 from "../images/i6.webp";
const BgSlider = () => {
  return (
    <div style={{ width: "100%", height: "90%" }}>
      <Carousel variant="dark">
        <Carousel.Item
          style={{ height: "100%", alignItems: "center", textAlign: "center" }}
        >
          <img style={{ width: "100%", textAlign: "center" }} src={I1} alt="" />
        </Carousel.Item>
        <Carousel.Item style={{ alignItems: "center", textAlign: "center" }}>
          <img style={{ width: "100%", textAlign: "center" }} src={I2} alt="" />
        </Carousel.Item>
        <Carousel.Item style={{ alignItems: "center", textAlign: "center" }}>
          <img style={{ width: "100%", textAlign: "center" }} src={I3} alt="" />
        </Carousel.Item>
        <Carousel.Item style={{ alignItems: "center", textAlign: "center" }}>
          <img style={{ width: "100%", textAlign: "center" }} src={I4} alt="" />
        </Carousel.Item>
        <Carousel.Item style={{ alignItems: "center", textAlign: "center" }}>
          <img style={{ width: "100%", textAlign: "center" }} src={I5} alt="" />
        </Carousel.Item>
        <Carousel.Item style={{ alignItems: "center", textAlign: "center" }}>
          <img style={{ width: "100%", textAlign: "center" }} src={I6} alt="" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
export default BgSlider;
