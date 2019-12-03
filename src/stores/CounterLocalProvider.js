import React, { createContext, useEffect } from "react";
import { createStore } from "redux";
import { Provider, createSelectorHook, createDispatchHook } from "react-redux";

const CHANGE_COUNTER = "CHANGE_COUNTER_COUNTER_LOCAL";

export const CounterLocalContext = createContext();
export const useDispatchCounterLocal = createDispatchHook(CounterLocalContext);
export const useSelectorCounterLocal = createSelectorHook(CounterLocalContext);

export const changeCounterLocalAction = () => ({
  type: CHANGE_COUNTER
});

function onChange(value) {
  this.value = value;
  return this;
}

function onCount() {
  this.value += 1;
  return this;
}

function initiateStatus() {
  return {
    success: false,
    form: {
      counter: { value: 0, onCount: onCount },
      name: { name: "name", value: "", onChange: onChange },
      age: { name: "age", value: "", onChange: onChange }
    }
  };
}

function handleChangeCounter(states) {
  const counter = states.form.counter;
  return {
    ...states,
    form: {
      ...states.form,
      counter: counter.onCount()
    }
  };
}

function reducer(states = initiateStatus(), actions) {
  switch (actions.type) {
    case CHANGE_COUNTER:
      return handleChangeCounter(states);
    default:
      return states;
  }
}

export default function({ children }) {
  const store = createStore(reducer);

  useEffect(() => {
    console.log("FormContext create");
    return () => console.log("FormContext destroy");
  }, []);

  return (
    <Provider context={CounterLocalContext} store={store}>
      {children}
    </Provider>
  );
}
