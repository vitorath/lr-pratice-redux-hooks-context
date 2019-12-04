import React, { createContext, useEffect } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider, createDispatchHook, createSelectorHook } from "react-redux";
import createSagaMiddleware from "redux-saga";
import watchGlobal from "./GlobalSaga";

const CHANGE_COUNTER = "CHANGE_COUNTER_GLOBAL";
const SET_TOKEN = "SET_TOKEN_GLOBAL";

export const GlobalContext = createContext();
export const useDispatchGlobal = createDispatchHook(GlobalContext);
export const useSelectorGlobal = createSelectorHook(GlobalContext);

export const changeCounterGlobalAction = () => ({
  type: CHANGE_COUNTER
});

export const setTokenAction = token => ({
  type: SET_TOKEN,
  token: token
});

function initiateStatus() {
  return {
    counterGlobal: 0,
    token: null
  };
}

function handleChangeCounter(states) {
  return {
    ...states,
    counterGlobal: states.counterGlobal + 1
  };
}

function handleSetToken(states, actions) {
  return {
    ...states,
    token: actions.token
  };
}

function reducer(states = initiateStatus(), actions) {
  switch (actions.type) {
    case CHANGE_COUNTER:
      return handleChangeCounter(states);
    case SET_TOKEN:
      return handleSetToken(states, actions);
    default:
      return states;
  }
}

export default function({ children }) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(watchGlobal);

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
