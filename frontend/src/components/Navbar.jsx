import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import CartIcon from '../images/cart.svg'
import SearchIcon from '../images/search.svg';
import UserIcon from '../images/user.svg'
import store from '../state/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Container = styled.div` 
    border-bottom: 0.5px solid #BFBFBF;
    position: fixed;
    top:0px;
    width: 100vw;
    background: white;
`
const UpperNav = styled.div`
    display: flex;
    padding: 15px 10px;
    justify-content:space-between ;
    font-family: Montserrat,sans-serif;
`
const UpperNavOptionsContainer = styled.div`
    display: flex;
    flex : 0.2;
    justify-content: space-evenly;
`
const UpperNavOptions = styled.div` 
    width: 30px;
    height:30px ;
`
const Center = styled.div`
    flex:1;
    text-align:center ;
    font-size: 30px;
    font-weight: 500;
`
const Search = styled.div`
    display: flex;
    flex : 0.3;
    justify-content: right;
`
const StyledLink = styled(Link)` 
text-decoration: none;
color: black;
`
const LowerNav = styled.div` 
    display: flex;
    justify-content : space-evenly;
    padding-top: 20px;
    /* padding: 10px; */
`
const LowerNavOptions = styled.div` 
    font-size: 0.75rem;
    letter-spacing: 1px;
    &:after{
        margin-top: 5px;
        content: "";
        background: black;
        height: 2px;
        width : 0;
        display: block;
        transition: width 0.25s ease-out;
    }
    &:hover::after{
        width: 100%;
    }
    /* &:hover {
        border-bottom: 2px solid black;
        transition: ;
  } */
`
const Navbar = (props) => {
    const toggleSideBar = props.toggleSideBar;
    const user = useSelector(state => state.user);
    const [inputText,setInputText] = useState('');
    const navigate = useNavigate();
    const handleInputText = (e) => {
        setInputText(e.target.value);
    }
    const HandleSignOut = async(e) => {
        fetch('http://localhost:5000/api/auth/logout',{
            method : 'GET',
            credentials : 'include'
        })
        .then(res=>store.dispatch({type:'unset',payload:null}));
    }   
    const handleTitleQuery = async(e) => {
        e.preventDefault();
        navigate(`/search?title=${inputText}`);
    }
  return (
    <Container>
    <UpperNav>
        {/* <form onSubmit={handleTitleQuery}>
        <Search>
            <input type="text" style={{width : "80%",fontSize : "20px"}} value = {inputText} onChange={handleInputText}/>
            <div style={{width:"30px",marginLeft:"10px"}}><img src={SearchIcon} alt="" /></div>
            <button type='submit' style={{"display":"none"}}></button>
        </Search>
        </form> */}
        <Center><StyledLink to = "/">TRY ON</StyledLink></Center>
        <UpperNavOptionsContainer>
            <UpperNavOptions>
                <img src={UserIcon} alt="" />
            </UpperNavOptions>
            <UpperNavOptions>
                <img src={SearchIcon} alt="" />
            </UpperNavOptions>
            <UpperNavOptions onClick={toggleSideBar}>
                <img src={CartIcon} alt="" />
            </UpperNavOptions>
        </UpperNavOptionsContainer>
        {/* <Option>
            {(user===null)? <div style={{paddingTop:"6px"}}><StyledLink to='/login'>SIGN IN</StyledLink></div> : <div style={{width:"30px"}}><StyledLink to = '/profile'><img src={UserIcon} alt="" /></StyledLink></div>}

        
            {(user===null)? <div style={{paddingTop:"6px"}}><StyledLink to='/register'>REGISTER</StyledLink></div> : <div onClick={HandleSignOut} style={{paddingTop:"6px"}}>SIGNOUT</div>}
            
            
            <div style={{width:"30px"}}><StyledLink to = '/cart'><img src={CartIcon} alt="" /></StyledLink></div>
        </Option>   */}
    </UpperNav>
    <LowerNav>
        <LowerNavOptions>
            BOOK AN APPOINTMENT
        </LowerNavOptions>
        <LowerNavOptions>
            SHOP
        </LowerNavOptions>
        <LowerNavOptions>
            STORIES ABOUT US
        </LowerNavOptions>
        <LowerNavOptions>
            BESPOKE
        </LowerNavOptions>
        <LowerNavOptions>
            STORES
        </LowerNavOptions>
        <LowerNavOptions>
            FRANCHISE ENQUIRY
        </LowerNavOptions>
    </LowerNav>
    </Container>
  )
}

export default Navbar