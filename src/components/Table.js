import styled from "styled-components"


const StyledTable = styled.table`
    width: 100%;
    th{
        text-align: left;
        text-transform: uppercase;
        color: var(--textWhite2);
        font-weight: 600;
        font-size: .8rem;
        padding: 1rem;
    }
    td{
        padding-top: 1rem;
        border-top: 1px solid var(--bdGreen) ;
    }
`

export default function Table ({children}){
    return(
        <StyledTable>{children}</StyledTable>
    )
}