import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import store from "../state/store";
import { useSelector } from "react-redux";
const Container = styled.div`
  height: 100%;
  width: 100%;
`;
const Wrapper = styled.div`
  margin: auto;
  margin-top: 10%;
  height: 400px;
  width: 500px;
  border-radius: 1rem;
  padding: 30px;
  display: grid;
  align-items: center;
  background-color: white;
  opacity: 0.9;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;
`;
const Label = styled.div`
  width: 120px;
  font-size: 20px;
  font-weight: 500;
  padding-top: 5px;
`;
const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 15px;
  border: 0.5px solid #bfbfbf;
  margin-bottom: 20px;
`;
const Field = styled.div`
  display: flex;
`;
const Button = styled.button`
  height: 50px;
  width: 100%;
  background: black;
  color: white;
  border: none;
  margin-left: auto;
  margin-right: auto;
`;
const Login = () => {
  const [InputData, setInputData] = useState({
    mobile: "",
    password: "",
  });
  const user = useSelector((state) => state.user);
  const navigate = useNavigate(); //to redirect in react-router
  const InputChangeHandler = (e) => {
    if (e.target.name === "mobile") {
      InputData.mobile = e.target.value;
    } else {
      InputData.password = e.target.value;
    }
    setInputData({
      ...InputData,
    });
  };
  const HandleSubmission = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", {
        ...InputData,
        token: localStorage.getItem("token"),
      })
      //   // .then((res) => {
      //   //   store.dispatch({ type: "set", payload: res.data.user });
      //   //   navigate("/");
      //   // })
      .then((res) => res.data.token)
      .then((token) => {
        if (token) localStorage.setItem("token", token);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <Wrapper>
        <p>LOGIN</p>
        <p>Please enter your mobile number and password:</p>
        <Form onSubmit={HandleSubmission}>
          <Field>
            <Input
              type="text"
              name="mobile"
              value={InputData.mobile}
              onChange={InputChangeHandler}
              placeholder="Mobile"
            />
          </Field>
          <Field>
            <Input
              type="password"
              name="password"
              value={InputData.Password}
              onChange={InputChangeHandler}
              placeholder="password"
            />
          </Field>
          <Field>
            <Button type="submit">LOG IN</Button>
          </Field>
        </Form>
        <p>
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </Wrapper>
    </Container>
  );
};

export default Login;
