"use client"

import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color: var(--bgBlack1);
  color: #fff;
  padding: 50px 0;
  top: -10px;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
  font-family: Inter, -apple-system, Helvetica, Arial, sans-serif;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
    max-width: 100%;
  }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);

  function addFeaturedtoCart() {
    addProduct(product._id);
  }

  const desc = product?.description.split("*")[0];

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product?.title}</Title>
              <Desc>{desc}</Desc>
              <ButtonWrapper>
                <ButtonLink
                  href={"/products/" + product?._id}
                  white={1}
                  outline={1}
                >
                  Read more
                </ButtonLink>
                <Button white={1} onClick={addFeaturedtoCart}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonWrapper>
            </div>
          </Column>
          <Column>
            <img
              src={product?.images[0]}
              alt="img"
            ></img>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
