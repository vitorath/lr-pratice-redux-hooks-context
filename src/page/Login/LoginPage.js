import React, { useEffect } from "react";
import Button from "../../components/UI/Button/Button";
import {
  useDispatchGlobal,
  useSelectorGlobal
} from "../../stores/GlobalProvider";
import { loginAction } from "../../stores/GlobalSaga";

export default ({ history }) => {
  const dispatch = useDispatchGlobal();
  const isAuthenticated = useSelectorGlobal(states => states.token !== null);

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      console.log("dfsf");
      history.push("/");
    }
  }, [history, isAuthenticated]);

  const makeLoginHandler = () => {
    dispatch(loginAction());
  };

  return <Button onClick={makeLoginHandler}>Login</Button>;
};
