import styled,{css} from "styled-components"

export const ButtonStyle = css`
    border: 0;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    font-family: 'Poppins',sans-serif;
    font-weight: bold;

    svg{
        height: 16px;
        margin-right: 5px;
    }


    ${props => props.block && css`
        display: block;
        width: 100%;
    `}
    
    ${props => props.white && !props.outline && css`
        background-color: #fff;
        color: #000;
    `}
    ${props => props.white && props.outline && css`
        background-color: transparent;
        color: #fff;
        border: 1px solid var(--bdGreen);
    `}
    ${props => props.black && !props.outline && css`
        background-color: #000;
        color: #fff;
    `}
    ${props => props.black && props.outline && css`
        background-color: transparent;
        color: #000;
        border: 1px solid #000;
    `}
    ${props => props.primary && !props.outline && css`
        background-color: var(--bdGreen);
        color: #fff;
        border: 1px solid var(--bdGreen);
    `}
    ${props => props.primary && props.outline && css`
        display: block;
        background-color: var(--textWhite1);
        color: var(--bgBlack1);
        border: 1px solid var(--bdGreen);
    `}
    ${props => props.size == 'l' && css`
        font-size: 1.2rem;
        padding: 10px 20px;
        svg{
            height: 20px;
        }
    `}
    ${props => props.quantity && css`
        padding: 0 10px;
    `}
`;

const StyledButton = styled.button`
   ${ButtonStyle}
`;


export default function Button({children,...rest}) {
    return (
        <StyledButton {...rest}>{children}</StyledButton>
    )
}