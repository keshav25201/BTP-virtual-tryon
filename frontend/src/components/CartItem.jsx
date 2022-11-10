import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.div`
display: flex;
`
const TextItemsWrapper = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`
const CartItem = (props) => {
    const item = props.item;
    console.log(item);
  return (
    <Wrapper>
        <div><img src={item.image} alt="" width={"80px"}/></div>
        <TextItemsWrapper>
            <p>{item.title}</p>
            <p>Rs {item.price}</p>

        </TextItemsWrapper>
    </Wrapper>
  )
}

export default CartItem