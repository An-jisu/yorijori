const Dropdown = (props) => {
  return (
    <>
      {props.selectedPlaces.map((data) => (
        <li onClick={props.onClick(data)}>{data["중심관광지명"]}</li>
      ))}
    </>
  );
};

export default Dropdown;
