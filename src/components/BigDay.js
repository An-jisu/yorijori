import styled from "styled-components";

const DayBox=styled.div`
    width: 120px;
    display: flex;
    padding: 10px 8px;
    justify-content: center;
    align-items: center;
    border: 0.1px solid #EBEBF0;
    background: ${(props)=> props.isSelected? '#EBEBF0' : 'white'};
    color: #000;
    text-align: center;
    font-family: Inter;
    font-size: 20px;
    font-weight: 700;
    line-height: normal;
`

const BigDay = (props) => {
    return(
        <DayBox isSelected={props.isSelected} onClick={props.onClick}>
            DAY {props.num}
        </DayBox>
    )
}

export default BigDay;