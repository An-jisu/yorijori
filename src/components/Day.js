import styled from "styled-components";

const DayBox = styled.div`
  width: 80px;
  display: flex;
  padding: 10px 8px;
  justify-content: center;
  align-items: center;
  border: 0.1px solid #ebebf0;
  border-radius: 4px;
  background: ${(props) => (props.isSelected ? "#75A17B" : "white")};
  text-align: center;
  font-family: "GmarketSansTTFBold";
  font-size: 17px;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

const Day = (props) => {
  return (
    <DayBox isSelected={props.isSelected} onClick={props.onClick}>
      DAY {props.num}
    </DayBox>
  );
};

export default Day;
