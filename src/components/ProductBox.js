"use client"


import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div``;

const BlackBox = styled(Link)`
  background-color: var(--bgSlate);
  padding: 0px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 100px;
  }
`;
const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;
const ProductInfoBox = styled.div`
  margin-top: 10px;
`;
export const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;
export const Price = styled.div`
    font-size: 1rem;
    font-weight: 600;
    text-align: right;
    @media screen and (min-width: 768px) {
      font-size: 1.2rem;
      font-weight: bold;
      text-align: left;
    }
`

export default function ProductBox({
  _id,
  title,
  description,
  price,
  images,
}) {

  const {addProduct} = useContext(CartContext);

  const url ='/products/'+_id;
  return (
    <ProductWrapper>
      <BlackBox href={url}>
          <img src={images[0]} alt="images" />
      </BlackBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>₹{price}</Price>
          <Button onClick={() => addProduct(_id)} primary={1} outline={1}>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
