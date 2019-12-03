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
import { useDispatchCounterLocal, useSelectorCounterLocal, changeCounterLocalAction } from "../../../stores/CounterLocalProvider";

export default () => {
  const dispatchForm = useDispatchForm();
  const counter = useSelectorForm(states => ({ ...states.form.counter }));

  const dispatchGlobal = useDispatchGlobal();
  const globalCounter = useSelectorGlobal(states => states.counterGlobal);

  const dispatchLocal = useDispatchCounterLocal();
  const counterLocal = useSelectorCounterLocal(states => ({ ...states.form.counter }));

  const countLocalHandler = useCallback(() => {
    dispatchLocal(changeCounterLocalAction());
  }, [dispatchLocal]);

  const countHandler = useCallback(() => {
    dispatchForm(changeCounterAction());
  }, [dispatchForm]);

  const countGlobalHandler = useCallback(() => {
    dispatchGlobal(changeCounterGlobalAction());
  }, [dispatchGlobal]);

  useEffect(() => {
    console.log("CounterForm create");
    return () => console.log("CounterForm destroy");
  }, []);

  return (
    <fieldset>
      <legend>Counter Local</legend>
      <div style={{ display: "flex", margin: "10px 0" }}>
        <div>
          <Button onClick={countLocalHandler}>Counter Local</Button>
        </div>
        <div>
          <Counter>{counterLocal.value}</Counter>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <Button onClick={countHandler}>Counter Pai</Button>
        </div>
        <div>
          <Counter>{counter.value}</Counter>
        </div>
      </div>
      <div style={{ display: "flex", margin: "10px 0"  }}>
        <div>
          <Button onClick={countGlobalHandler}>Counter Global</Button>
        </div>
        <div>
          <Counter>{globalCounter}</Counter>
        </div>
      </div>
    </fieldset>
  );
};
