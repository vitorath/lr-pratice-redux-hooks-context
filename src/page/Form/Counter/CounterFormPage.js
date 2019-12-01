import React, { useCallback, useEffect } from "react";
import Counter from "../../../components/UI/Counter/Counter";
import Button from "../../../components/UI/Button/Button";

import {
  useSelectorForm,
  useDispatchForm,
  changeCounterAction
} from "../../../stores/FormProvider";

import {
  useDispatchGlobal,
  useSelectorGlobal,
  changeCounterGlobalAction
} from "../../../stores/GlobalProvider";

export default () => {
  const dispatch = useDispatchForm();
  const counter = useSelectorForm(states => ({ ...states.form.counter }));

  const dispatchGlobal = useDispatchGlobal();
  const globalCounter = useSelectorGlobal(states => states.counterGlobal);

  const countHandler = useCallback(() => {
    dispatch(changeCounterAction());
  }, [dispatch]);

  const countGlobalHandler = useCallback(() => {
    dispatchGlobal(changeCounterGlobalAction());
  }, [dispatchGlobal]);

  useEffect(() => {
    console.log("CounterForm create");
    return () => console.log("CounterForm destroy");
  }, []);

  return (
    <fieldset>
      <legend>Counter Form</legend>
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
