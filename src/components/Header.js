import styled from "styled-components";
import logo from "../assets/logo.svg";

const Container=styled.div`
    padding: 10px 0 30px 0;
    display: flex;
    justify-content: center;
`
const Logo=styled.img`
    width: 150px;
    height: 100px;
    flex-shrink: 0;
`

const Header = () => {
    return(
        <Container>
            <Logo src={logo} />
        </Container>
    )
}

export default Header;