import React from "react";

const style = {
  fontSize: "17px",
  fontWeight: "800",
  padding: "5px 20px",
  margin: "0px 12px",
  border: "1px solid #000000DD"
};

export default React.memo(({ children }) => <p style={style}>{children}</p>);
