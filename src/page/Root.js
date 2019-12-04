import React from "react";
import { BrowserRouter, Switch, Link, Route, Redirect } from "react-router-dom";

import LoginPage from "./Login/LoginPage";
import { useSelectorGlobal, useDispatchGlobal } from "../stores/GlobalProvider";
import { logoutAction } from "../stores/GlobalSaga";
import Button from "../components/UI/Button/Button";
import PrivateRoot from "./PrivateRoot";

export default () => {
  const dispatch = useDispatchGlobal();
  const isAuthenticated = useSelectorGlobal(states => states.token !== null);

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  const makeRoutes = () => {
    if (isAuthenticated) {
      return <PrivateRoot />;
    }
    return <Redirect to="/login" />;
  };

  return (
    <BrowserRouter>
      {isAuthenticated && (
        <div>
          <Link to="/">Home</Link>
          <hr />
          <Link to="/form">Register</Link>
          <br />
          <Link to="/form/counter">Counter</Link>
          <br />
          <Link to="/form/counter/local">Counter Local</Link>
          <hr />
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      )}

      <Switch>
        <>
          <Route exact path="/login" component={LoginPage} />
          {makeRoutes()}
        </>
      </Switch>
    </BrowserRouter>
  );
};
