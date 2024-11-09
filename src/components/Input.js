import styled from "styled-components"

const StyledInput = styled.input`
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    border: 1px solid var(--bdGreen);
    border-radius: 5px;
    box-sizing: border-box;
    background-color: transparent;
`


export default function Input(props){
    return(
        <StyledInput {...props}/>
    )
}