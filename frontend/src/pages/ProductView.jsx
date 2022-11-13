import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import store from "../state/store";
import Quantity from "../components/Quantity";
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

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/product/${productId}`)
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
        <p>Loading</p>
      </Wrapper>
    );

  
  function handleChange(e) {
      setFile(URL.createObjectURL(e.target.files[0]));
  }
  const virtualTryOn = (e) => {
  };

  return (
    <Wrapper>
      <div style={{ width: "500px" }}>
        <Carousel variant="dark" interval={null}>
          <Carousel.Item style={{ alignItems: "center", textAlign: "center"}}>
            <img
              style={{ width: "500px", textAlign: "center" }}
              src={product.image}
              alt=""
            />
          </Carousel.Item>
          <Carousel.Item>
            <img style={{ width: "500px" , textAlign: "center"}} src={product.image} alt="" />
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
        {/* <Button onClick={virtualTryOn}>UPLOAD IMAGE TO TRY ON</Button> */}
        
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <h4>ADD IMAGE FOR TRY ON</h4>
        <input type="file" onChange={handleChange} />
        <img src={file} />
      </DetailsWrapper>
    </Wrapper>
  );
};

export default ProductView;
