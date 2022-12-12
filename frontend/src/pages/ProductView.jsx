import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import store from "../state/store";
import Quantity from "../components/Quantity";
import Loading from "../images/loading-state.gif";
const Wrapper = styled.div`
  padding: 30px;
  display: flex;
  width: 100vw;
`;
const ImageWrapper = styled.div`
  height: 600px;
  width: 600px;
`;
const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  padding-left: 5rem;
`;
const Button = styled.button`
  width: 80%;
  background: #1c1b1b;
  color: white;
  ${"" /* align-self: center; */}
  padding: 10px;
  margin-top: 10px;
  border: none;
`;
const ProductView = () => {
  const params = useParams();
  const productId = params.productId;
  console.log(productId);
  const [product, setProduct] = useState(null);
  const [file, setFile] = useState(null);
  const [try_on_result, set_try_on_result] = useState("");
  useEffect(() => {
    fetch(`http://4895-34-143-226-12.ngrok.io/api/product/${productId}`,{
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "1",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setProduct({ ...data }))
      .catch((err) => console.log(err));
  }, [productId]);

  const addToCart = (e) => {
    store.dispatch({ type: "add", payload: product });
  };
  if (!product)
    return (
      <Wrapper>
        <p>Loading..</p>
      </Wrapper>
    );

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const virtualTryOn = async (e) => {
    var blob = await fetch(file).then((res) => res.blob());
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async function () {
      var base64StringPerson = reader.result;
      var blob = await fetch(product.image).then((res) => res.blob());
      var reader1 = new FileReader();
      reader1.readAsDataURL(blob);
      reader1.onloadend = function () {
        var base64StringCloth = reader1.result;
        var data = {
          img: base64StringPerson,
          cloth: base64StringCloth,
        };
        console.log(data);
        set_try_on_result(Loading);
        
        fetch("http://4895-34-143-226-12.ngrok.io/tryon", {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "1",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.text())
          .then((res) => set_try_on_result("data:image/png;base64," + res))
          .catch((err) => console.log(err));
        // console.log("Base64 String - ", base64String);
      };
    };
  };

  return (
    <Wrapper>
      <div style={{ width: "500px" }}>
        <Carousel variant="dark" interval={null}>
          <Carousel.Item style={{ alignItems: "center", textAlign: "center" }}>
            <img
              style={{ width: "500px", textAlign: "center" }}
              src={product.image}
              alt=""
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ width: "500px", textAlign: "center" }}
              src={product.image}
              alt=""
            />
          </Carousel.Item>
        </Carousel>
      </div>

      {/* <ImageWrapper><img style={{height:"100%"}} src={product.image} alt="" /></ImageWrapper>
            <ImageWrapper><img style={{height:"100%"}} src={product.image} alt="" /></ImageWrapper> */}

      <DetailsWrapper>
        <p style={{ fontSize: "25px", fontWeight: "500" }}>{product.title}</p>
        <p style={{ paddingBottom: "15px", fontSize: "13px" }}>
          {product.brief}
        </p>
        <p style={{ fontSize: "20px", paddingBottom: "15px" }}>
          ₹ {product.price}
        </p>
        <p style={{ paddingBottom: "15px", fontSize: "13px" }}>
          {product.description}
        </p>
        <Quantity />
        <Button onClick={addToCart}>ADD TO CART</Button>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <h4>ADD IMAGE FOR TRY ON</h4>
        <input type="file" onChange={handleChange} />
        <span>&nbsp;</span>
        <div style={{ display: "flex", justifyContent: "space-between", width: "600px" }}>
          <img src={file} style={{ width: "300px", height: "400px", flex: 1 }} />
          <img
            src={try_on_result}
            style={{ width: "300px", height: "400px" }}
          />
        </div>
        <Button onClick={virtualTryOn}>TRY ON</Button>
      </DetailsWrapper>
    </Wrapper>
  );
};

export default ProductView;
