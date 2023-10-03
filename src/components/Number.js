import styled from "styled-components";
import logo from "../assets/logo.svg";

const TotalContainer=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

const Container=styled.div`
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 5px;
    background: rgba(248, 239, 160, 0.80);
`
const Num=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top:5px;
    flex-shrink: 0;
    color: #000;
    font-family: Roboto;
    font-size: 15px;
    font-weight: 700;
    line-height: normal;
`

const Line=styled.div`
    height: 75px;
    border: 1px dashed #DAC400;
`

const Number = (props) => {
    return(
        <TotalContainer>
            <Container>
                <Num>
                    {props.content}
                </Num>
            </Container>
            <Line />
        </TotalContainer>
    )
}

export default Number;