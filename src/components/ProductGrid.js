import styled from "styled-components";
import ProductBox from "./ProductBox";
import Center from "./Center";



const StyleProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  /* padding: 0px;
  margin: 0px; */
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;  
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;  
  }
`;

export default function ProductGrid({ products }) {
  return (
    <Center>
      <StyleProductsGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBox key={product._id} {...product} />
          ))}
      </StyleProductsGrid>
    </Center>
  );
}
