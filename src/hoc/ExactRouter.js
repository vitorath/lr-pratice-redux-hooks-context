import React from "react";
import { withRouter } from "react-router-dom";

export default withRouter(({ location, path, component }) => (
  <>{location.pathname === path && component}</>
));
