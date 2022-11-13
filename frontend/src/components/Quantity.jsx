import React, { useState } from "react";
import styled from "styled-components";
import PlusIcon from "../images/plus.svg";
import MinusIcon from "../images/minus.svg";
const Container = styled.div`
  display: flex;
  height: 39px;
  width: 120px;
  border: 0.5px solid #bfbfbf;
`;
const Input = styled.input`
  width: 40px;
  text-align: center;
  border: none;
  font-size: 25px;
`;
const Quantity = () => {
  const [quantity, setQuantity] = useState(1);
  const increment = (e) => {
    setQuantity(Number(quantity) + 1);
  };
  const decrement = (e) => {
    if (quantity > 1) setQuantity(Number(quantity) - 1);
  };
  const handleChange = (e) => {
    setQuantity(e.target.value);
  };
  return (
    <Container>
      <img src={PlusIcon} height="39px" onClick={increment}></img>
      <Input value={quantity} onChange={handleChange} />
      <img src={MinusIcon} height="39px" onClick={decrement}></img>
    </Container>
  );
};

export default Quantity;
