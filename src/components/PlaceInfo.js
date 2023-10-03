import styled from "styled-components";
import logo from "../assets/logo.svg";

const Container=styled.div`
    display: flex;
    gap: 20px;
    width: 100%;
    max-height: 90vh;  
`
const Img=styled.img`
    width: 200px;
    height: 120px;
`

const Content=styled.div`
    font-family: Roboto;
    font-size: 15px;
    font-weight: 700;
    line-height: normal;
`

const PlaceInfo = (props) => {
    return(
        <Container>
            <Img src={props.src}/>
            <Content>{props.content}</Content>
        </Container>
    )
}

export default PlaceInfo;