import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
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
const Signup = () => {
  const [InputData, setInputData] = useState({
    mobile: "",
    password: "",
    email: "",
    name: "",
  });
  const InputChangeHandler = (e) => {
    InputData[e.target.name] = e.target.value;
    setInputData({
      ...InputData,
    });
  };
  const HandleSubmission = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/register", InputData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <Wrapper>
        <p>REGISTER</p>
        <p>Please fill in the information below:</p>
        <Form onSubmit={HandleSubmission}>
          <Field>
            <Input
              type="text"
              name="name"
              value={InputData.name}
              onChange={InputChangeHandler}
              placeholder="Name"
            />
          </Field>
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
              type="text"
              name="email"
              value={InputData.email}
              onChange={InputChangeHandler}
              placeholder="Email"
            />
          </Field>
          <Field>
            <Input
              type="password"
              name="password"
              value={InputData.password}
              onChange={InputChangeHandler}
              placeholder="Password"
            />
          </Field>
          <Field>
            <Button type="submit">SIGN UP</Button>
          </Field>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Signup;
