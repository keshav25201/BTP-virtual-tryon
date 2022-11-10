import React,{useEffect,useState} from 'react'
import CartItem from './CartItem'
import styled from 'styled-components'
import CloseIcon from '../images/close.svg'
const Container = styled.div` 
    position: fixed;
    top: 0;
    right: 0;
    background: #f9f8f8;
    height: 100vh;
    width: 23rem;
    transform: translateX(${props => props.x}rem);
    transition: transform .3s ease-in-out;
    display: flex;
    flex-direction: column;
`
const SidebarTop = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 20px;
    border-bottom: 0.5px solid #BFBFBF;
`
const SidebarBottom = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 0.8rem;
`
const SidebarMiddle = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    flex : 1;
`
const CloseSideBarContainer = styled.div` 
    height: 30px;
    width: 30px;
`
const Button = styled.button` 
    width : 100%;
    background: #1c1b1b;
    color: white;
    align-self: center;
    padding : 13px;
    margin-top : 10px;
    border: none;
`
const Sidebar = (props) => {
    const [cartItems,setCartItems] = useState([]);
    const toggleSideBar = props.toggleSideBar;
    const isOpen = props.isOpen;
    const fetchProduct = async(productId,quantity) => {
        // console.log(productId,quantity);
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`)
        var data = await res.json();
        data.quantity = quantity 
        return data;
    }
    const fetchProducts = async(products) => {
        return Promise.all(products.map((product) => fetchProduct(product.productId,product.quantity)))
    }
    useEffect(() => {
        fetch('https://fakestoreapi.com/carts/user/2')
        .then(res => res.json())
        .then(res => res[0].products)
        .then(products => fetchProducts(products))
        .then(products => setCartItems([...products]))
        .catch(err => console.log(err))
    },[])
  return (
    <div>
 <Container x = {isOpen?0:30}>
        <SidebarTop>
            <p>CART</p>
            <div style={{"flex":"1"}}></div>
            <CloseSideBarContainer onClick={toggleSideBar}>
            <img height={"20px"} width ={"20px"} src = {CloseIcon} alt=""></img>
            </CloseSideBarContainer>
        </SidebarTop>
        <SidebarMiddle>
        {
            cartItems.map((item,index) => {
                return (
                    <CartItem item={item}></CartItem>
                )
            })
        }
        </SidebarMiddle>
   
        <SidebarBottom>
            <p>Add Order Note</p>
            <p>Shipping & taxes calculated at checkout</p>
            <Button>CHECKOUT . </Button>
        </SidebarBottom>
    </Container>
    </div>
   
  )
}

export default Sidebar