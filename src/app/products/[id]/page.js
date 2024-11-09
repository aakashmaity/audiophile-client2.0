"use client"


import Center from "@/components/Center";
import styled from "styled-components";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import { Price } from "@/components/ProductBox";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Layout from "@/components/Layout";
import { Box } from "@/app/cart/page";



const CalWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Desc = styled.p`
  font-family: Inter, -apple-system, Helvetica, Arial, sans-serif;
  font-weight: 400;
  line-height: 20px;
`
const DescList = styled.ul`
  list-style: disc;
  font-family: Inter, -apple-system, Helvetica, Arial, sans-serif;
  li {
    margin-bottom: 10px;
    font-weight: 350;
    line-height: 20px;
  }
`;

export default function ProductPage({params}) {
  const { addProduct } = useContext(CartContext);
  const [product, setProduct] = useState(null)

  const {id} = params

  useEffect(() => {
    axios.get(`/api/products/${id}`,).then((res) => {
      setProduct(res.data.product)
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  const description = product?.description?.split("*");


  if(!product){
    return <div>Loading...</div>
  }
  return (
    <Layout>
      <Center>
        <CalWrapper>
          <Box>
            <ProductImages images={product?.images} />
          </Box>
          <div>
            <h1>{product.title}</h1>
            <Desc>{description[0]}</Desc>
            <DescList>
              {description.map((desc, idx) =>
                idx !== 0 ? <li key={desc}>{desc}</li> : null
              )}
            </DescList>
            <PriceRow>
              <div>
                <Price>₹{product.price}</Price>
              </div>
              <div>
                <Button primary={1} outline={1} onClick={() => addProduct(product._id)}>
                  Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </CalWrapper>
      </Center>
    </Layout>
  );
}