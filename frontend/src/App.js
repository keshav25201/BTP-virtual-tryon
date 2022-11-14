import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import ProductView from "./pages/ProductView";
import OrderSuccessful from "./pages/OrderSuccessful";
import SearchView from "./pages/SearchView";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "./state/store";
import "./App.css";
import styled from "styled-components";
import BackgroundSlider from "./pages/BackgroundSlider";
import BgSlider from "./pages/BgSlider";
const LowerContainer = styled.div`
  display: flex;
  padding-top: 124px;
`;

const App = () => {
  const user = useSelector((state) => state.user);
  const [sideBarState, setSideBarState] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/verifyToken", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        store.dispatch({ type: "set", payload: data.user });
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleSideBar = () => {
    setSideBarState(!sideBarState);
  };
  return (
    <div className="App">
      <Navbar toggleSideBar={toggleSideBar}></Navbar>
      <Sidebar toggleSideBar={toggleSideBar} isOpen={sideBarState} />
      <LowerContainer>
        <Routes>
          <Route path="/" element={<BgSlider />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/:productId" element={<ProductView />} />
          <Route path="/successful" element={<OrderSuccessful />} />
          <Route path="/search" element={<SearchView />} />
        </Routes>
      </LowerContainer>
      {/* <div style={{ height: "200px" }}></div> */}
    </div>
  );
};

export default App;
