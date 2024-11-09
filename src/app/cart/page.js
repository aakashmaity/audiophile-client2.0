"use client"


import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import Script from "next/script";
import Layout from "@/components/Layout";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 20px;
  /* margin-top: 40px; */
`;
export const Box = styled.div`
  background-color: var(--bgSlate);
  border-radius: 10px;
  padding: 30px;
`;
const ProductInfoCell = styled.td`
  padding: 10px 0;
`;
const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid var(--bdGreen);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;
const QuantityLabel = styled.span`
  padding: 0 10px;
  display: block;
  @media screen and (min-width: 640px) {
    display: inline-block;
  }
`;
const AddressBox = styled.div`
  display: flex;
  gap: 5px;
`;
export const H2 = styled.div`
  font-size: 28px;
  margin: 5px 0;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  console.log("cartProducts iohuigug: " + cartProducts?.length);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((res) => {
        setProducts(res.data.products);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location?.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function increaseQty(id) {
    addProduct(id);
  }
  function decreaseQty(id) {
    removeProduct(id);
  }

  let totalAmount = 0;
  
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    totalAmount += price;
  }

  async function gotoPayment(totalamount) {
    const { data } = await axios.post("/api/checkout", {
      name,
      email,
      city,
      pincode,
      address,
      country,
      cartProducts,
      totalAmount,
    });
    const razor = new window.Razorpay(data?.options);
    razor.open();
  }

  if (isSuccess) {
    return (
      <Layout>
        <Center>
          <ColumnsWrapper>
            <Box>
              <H2>Thanks for your order!</H2>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      <Center>
        <ColumnsWrapper>
          <Box>
            <H2>Cart Items</H2>
            {!cartProducts?.length && <div>Your cart is Empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((p) => (
                    <tr key={p._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={p.images[0]} alt="" />
                        </ProductImageBox>
                        {p.title}
                      </ProductInfoCell>
                      <td>
                        <Button white={1} outline={1} quantity={1} onClick={() => decreaseQty(p._id)}>-</Button>
                        <QuantityLabel>
                          {cartProducts.filter((id) => id === p._id).length}
                        </QuantityLabel>
                        <Button white={1} outline={1} quantity={1} onClick={() => increaseQty(p._id)}>+</Button>
                      </td>
                      <td>
                        {cartProducts.filter((id) => id === p._id).length *
                          p.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>₹{totalAmount}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <H2>Shipping Details</H2>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <AddressBox>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="PIN code"
                  value={pincode}
                  name="pincode"
                  onChange={(e) => setPincode(e.target.value)}
                />
              </AddressBox>
              <Input
                type="text"
                placeholder="Full address"
                value={address}
                name="address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(e) => setCountry(e.target.value)}
              />
              <Button
                block={1}
                white={1}
                onClick={() => gotoPayment(totalAmount)}
              >
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </Layout>
  );
}
