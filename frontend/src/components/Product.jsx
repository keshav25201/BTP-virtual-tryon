import React from 'react';
import styled from 'styled-components';
const Wrapper = styled.div` 
    height: 500px;
    width : 303px;
    /* background-color: #f7fcfc;
    border : 1px solid black; */
    display: flex;
    flex-direction: column;
`

const DetailsWrapper = styled.div` 
    width: 100%;
    display:flex ;
    flex: 1;
    flex-direction: column;
    text-align: center;
    justify-content: flex-start;
    padding-top: 40px;
`
const Img = styled.img` 
    width : 303px;
    height: 400px;
`

const Product = (product) => {
    product = product.product;
  return (
    <Wrapper>
        <Img src = {product.image}></Img>
        <DetailsWrapper>
        <p style={{paddingBottom : "10px"}}>viala</p>
        <p>₹{product.price}</p>
        </DetailsWrapper>
    </Wrapper>
  )
}

export default Product