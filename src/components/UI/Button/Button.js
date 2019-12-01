import React from "react";

const style = {
  backgroundColor: "#D43965AA",
  border: "none",
  borderRadius: "4px",
  color: "white",
  padding: "12px 20px",
  fontWeight: "600"
};

export default React.memo(({ children, ...props }) => (
  <button style={style} {...props}>
    {children}
  </button>
));
