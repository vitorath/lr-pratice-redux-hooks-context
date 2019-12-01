import React from "react";

const style = {
  padding: "5px 20px"
};

export default React.memo(({ label, ...props }) => (
  <div style={{ display: "block" }}>
    <label>{label}</label>
    <input style={style} {...props} />
  </div>
));
