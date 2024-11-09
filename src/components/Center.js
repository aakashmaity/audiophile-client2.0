import styled from "styled-components"


const StyledDiv = styled.div`
    max-width: 100%;
    margin: 0 auto;
    padding: 15px 15px;
    @media screen and (min-width: 768px){
        padding: 0px 30px;
    }
    
`


export default function Center({children}) {
    return (
        <StyledDiv>{children}</StyledDiv>
    )
}