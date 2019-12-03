import React from "react";
import { BrowserRouter, Switch, Link } from "react-router-dom";

import "./App.css";
import GlobalProvider from "./stores/GlobalProvider";
import FormRoot from "./page/Form/Root";
import HomeRoot from "./page/Home/Root";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <div>
          <Link to="/">Home</Link>
          <hr />
          <Link to="/form">Register</Link>
          <br />
          <Link to="/form/counter">Counter</Link>
          <br />
          <Link to="/form/counter/local">Counter Local</Link>
          <hr />
        </div>

        <Switch>
          <>
            <FormRoot />
            <HomeRoot />
          </>
        </Switch>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default React.memo(App);
