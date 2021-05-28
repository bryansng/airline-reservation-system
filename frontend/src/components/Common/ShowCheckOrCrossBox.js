const ShowCheckOrCrossBox = ({ isCheck }) => {
  const defaultSize = "10px";
  const defaultStyle = {
    display: "inline-block",
    height: defaultSize,
    width: defaultSize,
  };
  return (
    <>
      {isCheck ? (
        <div style={{ ...defaultStyle, backgroundColor: "#19a974" }}></div>
      ) : (
        <div style={{ ...defaultStyle, backgroundColor: "#ff4136" }}></div>
      )}
      {/* {isCheck ? (
        <span style={{ color: "transparent", textShadow: "0 0 0 #19a974" }}>
          &#9745;
        </span>
      ) : (
        <span style={{ color: "transparent", textShadow: "0 0 0 #ff4136" }}>
          &#9746;
        </span>
      )} */}
    </>
  );
};

export default ShowCheckOrCrossBox;
