"use client"


import Link from "next/link";
import styled from "styled-components";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import NavIcon from "./icons/NavIcon";

const StyledHeader = styled.header`
  background-color: black;
  position: fixed;
  width: 100%;
  top: 0;
  padding: 0 15px;
  margin: 0;
  @media screen and (min-width: 768px) {
    padding: 0 40px;
  }  
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${props => (props.mobilenavactive && 'true') ? `display: block;` : `display: none;`}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: var(--textBlack2);
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
    background-color: transparent;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  /* position: relative; */
  
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobilenavactive, setMobilenavactive] = useState(false);

  
  function toggleMobileNav() {
    setMobilenavactive(!mobilenavactive);
  };

  return (
    <StyledHeader>
        <Wrapper>
          <Logo href={"/"}> Audiophile</Logo>
          <StyledNav mobilenavactive={mobilenavactive ? 'true' : undefined }>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>Products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart({cartProducts?.length})</NavLink>
          </StyledNav>
          <NavButton onClick={toggleMobileNav}>
            <NavIcon />
          </NavButton>
        </Wrapper>
    </StyledHeader>
  );
}
