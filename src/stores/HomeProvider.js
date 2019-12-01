import React, { createContext, useEffect } from "react";
import { createStore } from "redux";
import { Provider, createSelectorHook, createDispatchHook } from "react-redux";

const CHANGE_COUNTER = "CHANGE_COUNTER";
const CLEAR = "CLEAR";

export const HomeContext = createContext();
export const useDispatchHome = createDispatchHook(HomeContext);
export const useSelectorHome = createSelectorHook(HomeContext);

export const changeCounterAction = () => ({
  type: CHANGE_COUNTER
});

export const clearAction = () => ({
  type: CLEAR
});

function onCount() {
  this.value += 1;
  return this;
}

function initiateStatus() {
  return {
    form: {
      counter: { value: 0, onCount: onCount }
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

function handleClear() {
  return initiateStatus();
}

function reducer(states = initiateStatus(), actions) {
  switch (actions.type) {
    case CHANGE_COUNTER:
      return handleChangeCounter(states);
    case CLEAR:
      return handleClear(states);
    default:
      return states;
  }
}

export default function({ children }) {
  const store = createStore(reducer);

  useEffect(() => {
    console.log("HomeContext create");
    return () => console.log("HomeContext destroy");
  }, []);

  return (
    <Provider context={HomeContext} store={store}>
      {children}
    </Provider>
  );
}
