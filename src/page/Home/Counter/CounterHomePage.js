import React, { useCallback, useEffect } from "react";
import Counter from "../../../components/UI/Counter/Counter";
import Button from "../../../components/UI/Button/Button";

import {
  useDispatchGlobal,
  useSelectorGlobal,
  changeCounterGlobalAction
} from "../../../stores/GlobalProvider";
import {
  useDispatchHome,
  useSelectorHome,
  changeCounterAction,
  clearAction
} from "../../../stores/HomeProvider";

export default () => {
  const dispatch = useDispatchHome();
  const counter = useSelectorHome(states => ({ ...states.form.counter }));

  const dispatchGlobal = useDispatchGlobal();
  const globalCounter = useSelectorGlobal(states => states.counterGlobal);

  const countHandler = useCallback(() => {
    dispatch(changeCounterAction());
  }, [dispatch]);

  const countGlobalHandler = useCallback(() => {
    dispatchGlobal(changeCounterGlobalAction());
  }, [dispatchGlobal]);

  useEffect(() => {
    console.log("CounterHome create");
    return () => {
      console.log("CounterHome destroy");
      dispatch(clearAction());
    };
  }, [dispatch]);

  return (
    <fieldset>
      <legend>Counter Home</legend>
      <div style={{ display: "flex", margin: "10px 0" }}>
        <div>
          <Button onClick={countHandler}>Count Local</Button>
        </div>
        <div>
          <Counter>{counter.value}</Counter>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <Button onClick={countGlobalHandler}>Count Global</Button>
        </div>
        <div>
          <Counter>{globalCounter}</Counter>
        </div>
      </div>
    </fieldset>
  );
};
