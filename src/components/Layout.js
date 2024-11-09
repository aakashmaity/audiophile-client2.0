"use client";

import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const LayoutContainer = styled.div`
  min-height: 100vh;
`;

const Container = styled.div`
  position: relative;
`;
const ChildrenContainer = styled.div`
  margin-top: 58px;
`;

export default function Layout({ children }) {
  return (
    <LayoutContainer>
      <Container>
        <Header />
        <ChildrenContainer>{children}</ChildrenContainer>
        <Footer />
      </Container>
    </LayoutContainer>
  );
}
