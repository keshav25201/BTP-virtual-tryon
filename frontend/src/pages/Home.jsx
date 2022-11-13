import React, { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import styled from "styled-components";
import store from "../state/store";
import { useSelector } from "react-redux";
const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  /* overflow: scroll; */
  flex: 1;
  padding-left: 200px;
`;
const ProductList = styled.div`
  min-width: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 303px);
  justify-content: center;
  column-gap: 40px;
  row-gap: 20px;
  margin-top: 50px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 50px;
  font-size: 2rem;
`;
const FilterDiv = styled.div`
  display: flex;
`;
const SortDiv = styled.div`
  display: flex;
`;
const Select = styled.select`
  margin-left: 1rem;
  width: 100px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
const Home = () => {
  // const user = useSelector(state => state.user);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://587f-35-245-175-106.ngrok.io/api/product", {
      method: "GET",
      crossorigin: true,
      headers: {
        // 'Content-Type': 'application/json'
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
        'cookie': 'abuse_interstitial=64d9-35-245-175-106.ngrok.io',
        'path': '/api/product',
        'scheme': 'https',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7',
        'cache-control': 'max-age=0'
      }
    })
      .then((res) => res.json())
      .then((products) => setProducts([...products]))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div style={{ display: "flex", width: "100vw" }}>
      <FilterBar />
      <Container>
        {/* <FilterContainer>
            <FilterDiv>
            <p>Filter Products: </p>
            <Select name="size" id="size">
            <option value="small">S</option>
            <option value="medium">M</option>
            <option value="large">Mercedes</option>
            <option value="xlarge">Audi</option>
            </Select>
            <Select name="color" id="color">
            <option value="red">Red</option>
            <option value="black">Black</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            </Select>
            </FilterDiv>
            <SortDiv>
            <p>Sort Products: </p>
            <Select name="sort" id="sort">
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
            <option value="popularity">Popularity</option>
            </Select>
            </SortDiv>
        </FilterContainer> */}
        <ProductList>
          {products.map((product, index) => {
            return (
              <StyledLink to={`/${product._id}`} key={index}>
                <Product product={{ ...product }} />
              </StyledLink>
            );
          })}
        </ProductList>
      </Container>
    </div>
  );
};

export default Home;
