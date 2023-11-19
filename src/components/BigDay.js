import styled from "styled-components";

const DayBox = styled.div`
  width: 120px;
  display: flex;
  padding: 10px 8px;
  justify-content: center;
  align-items: center;
  border: 0.1px solid #ebebf0;
  background: ${(props) => (props.isSelected ? "#75A17B" : "white")};
  color: #000;
  text-align: center;
  font-family: "GmarketSansTTFBold";
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

const BigDay = (props) => {
  return (
    <DayBox isSelected={props.isSelected} onClick={props.onClick}>
      DAY {props.num}
    </DayBox>
  );
};

export default BigDay;
