import React from "react";
import { Route } from "react-router-dom";

import CounterHomePage from "./Counter/CounterHomePage";
import HomeProvider from "../../stores/HomeProvider";

export default () => (
  <HomeProvider>
    <Route exact path="/" component={CounterHomePage} />
  </HomeProvider>
);
