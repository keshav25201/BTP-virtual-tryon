import React from 'react'
import { Collapse } from 'antd';
import PlusIcon from '../images/plus.svg'
import styled from 'styled-components'
import "antd/dist/antd.css";
const { Panel } = Collapse;
const Container = styled.div` 
    padding: 50px 20px 20px 40px;
    display: flex;
    flex-direction: column;
    flex: 0.15;
    position: fixed;
    background: white;
    height: 100vw;
    
`
const FilterOptions = styled.div` 
    padding: 20px 5px 20px 5px;
    display: flex;
    border-bottom: 0.5px solid #BFBFBF;
`
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const colorList = ["Aqua Blue", "Beige", "Black", "Black And White", "Blue", "Brown", "Copper", "Ecru", "Electric Blue", "Emerald Green", "Gold", "Green", "Grey", "Ivory", "Koala Grey", "Lavender", "Light Blue", "Light Pink", "Lilac", "Lilac-Blue", "Lime Green", "Midnight Blue", "Mint Green", "Muave", "Multi-Coloured", "Mustard", "Mustard Yello", "Navy Blue", "Off White", "Orange", "Peach", "Pink", "Powder Pink", "Purple", "Red", "Rust", "Sage Green", "Salmon Pink", "Sea Green", "Sky Blue", "Stone Blue", "Teal", "Teal Blue", "Teal Green", "White", "Wine", "Yellow"];
const deliveryList = ["11 Days","19 Days","6 Days","7 Days","8 Days","9 Days"];
const fabricList = ["100% 140'S Wool", "100% Cotton", "100% Cotton Twill", "100% Knitted Cotton", "100% Linen", "100% Perennial Wool", "100% Silk", "100% Summer Wool", "100% Wool", "50% Cotton & 50% Silk", "85% Wool & 15% Silk", "Alloy & Mixed Metal", "Cotton Tussar", "Cotton Velvet", "Linen-Rayon", "Terry-Wool", "Wool Blend"];
const occassionList = ["Casual", "Cocktail Party", "Diwali Party", "Festive", "Formal", "Formal Dinner", "Haldi", "Lunch", "Mehndi", "Party", "Reception", "Sangeet", "Semi-Fornal", "Wedding"];
const FilterBar = () => {
  return (
    <Container>
        <Collapse accordion bordered={false} ghost>
        <Panel header="COLOR" key="1">
            {colorList.map((val,index) => {
                return <p>{val}</p>
            })}
    </Panel>
    <Panel header="DELIVERY" key="2">
    {deliveryList.map((val,index) => {
                return <p>{val}</p>
            })}
    </Panel>
    <Panel header="FABRIC" key="3">
    {fabricList.map((val,index) => {
                return <p>{val}</p>
            })}
    </Panel>
    <Panel header="OCCASSION" key="4">
    {occassionList.map((val,index) => {
                return <p>{val}</p>
            })}
    </Panel>
        </Collapse>
        {/* <FilterOptions>
            <p style={{"flex":1,"marginTop":"5px"}}>COLOR</p>
            <img height={"25px"} width={"25px"} src={PlusIcon} alt=""></img> 
        </FilterOptions>
        <FilterOptions>
            <p style={{"flex":1,"marginTop":"5px"}}>DELIVERY</p>
            <img height={"25px"} width={"25px"} src={PlusIcon} alt=""></img> 
        </FilterOptions>
        <FilterOptions>
            <p style={{"flex":1,"marginTop":"5px"}}>FABRIC</p>
            <img height={"25px"} width={"25px"} src={PlusIcon} alt=""></img> 
        </FilterOptions>
        <FilterOptions>
            <p style={{"flex":1,"marginTop":"5px"}}>OCCASION</p>
            <img height={"25px"} width={"25px"} src={PlusIcon} alt=""></img> 
        </FilterOptions> */}
    </Container>
  )
}

export default FilterBar