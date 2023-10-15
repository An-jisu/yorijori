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
    border-radius: 7px;
`
const InfoBox=styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const PlaceName=styled.div`
    font-family: Roboto;
    font-size: 25px;
    font-weight: 900;
    line-height: normal;
`

const Content=styled.div`
    font-family: Roboto;
    font-size: 17px;
    font-weight: 500;
    line-height: normal;
`

const PlaceInfo = (props) => {
    return(
        <Container>
            <Img src={props.src}/>
            <InfoBox>
                <PlaceName>{props.name}</PlaceName>
                <Content>{props.content}</Content>
            </InfoBox>
        </Container>
    )
}

export default PlaceInfo;