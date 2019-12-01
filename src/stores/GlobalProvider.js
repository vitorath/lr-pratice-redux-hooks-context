import React, { createContext, useEffect } from "react";
import { createStore } from "redux";
import { Provider, createDispatchHook, createSelectorHook } from "react-redux";

const CHANGE_COUNTER = "CHANGE_COUNTER_GLOBAL";

export const GlobalContext = createContext();
export const useDispatchGlobal = createDispatchHook(GlobalContext);
export const useSelectorGlobal = createSelectorHook(GlobalContext);

export const changeCounterGlobalAction = () => ({
  type: CHANGE_COUNTER
});

function initiateStatus() {
  return {
    counterGlobal: 0
  };
}

function handleChangeCounter(states) {
  return {
    ...states,
    counterGlobal: states.counterGlobal + 1
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
    console.log("GlobalContext create");
    return () => console.log("GlobalContext destroy");
  }, []);

  return (
    <Provider context={GlobalContext} store={store}>
      {children}
    </Provider>
  );
}
