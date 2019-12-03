import React, { createContext, useEffect } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider, createSelectorHook, createDispatchHook } from "react-redux";
import createSagaMiddleware from 'redux-saga';
import watchForm from "./FormSaga";

const CHANGE_COUNTER = "CHANGE_COUNTER_FORM";
const CHANGE_CRITERIAS = "CHANGE_CRITERIAS_FORM";
const CLEAR = "CLEAR_FORM";
const SUCCESS = "SUCCESS_FORM";
const FAIL = "FAIL_FORM";

export const FormContext = createContext();
export const useDispatchForm = createDispatchHook(FormContext);
export const useSelectorForm = createSelectorHook(FormContext);

export const changeCounterAction = () => ({
  type: CHANGE_COUNTER
});

export const changeCriteriasAction = (name, value) => ({
  type: CHANGE_CRITERIAS,
  name: name,
  value: value
});

export const clearAction = () => ({
  type: CLEAR
});

export const successAction = () => ({
  type: SUCCESS,
})

export const failAction = () => ({
  type: FAIL,
})

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

function handleChange(states, actions) {
  const criteria = states.form[actions.name];
  return {
    ...states,
    form: {
      ...states.form,
      [actions.name]: criteria.onChange(actions.value)
    }
  };
}

function handlerSuccess(states) {
  return {...states, success: true}
}

function handlerFail(states) {
  console.log(handlerFail)
  return {...states, success: false}
}

function handleClear() {
  return initiateStatus();
}

function reducer(states = initiateStatus(), actions) {
  switch (actions.type) {
    case CHANGE_COUNTER:
      return handleChangeCounter(states);
    case CHANGE_CRITERIAS:
      return handleChange(states, actions);
    case CLEAR:
      return handleClear();
    case SUCCESS:
      return handlerSuccess(states);
    case FAIL:
      return handlerFail(states);
    default:
      return states;
  }
}

export default function({ children }) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(watchForm)

  useEffect(() => {
    console.log("FormContext create");
    return () => console.log("FormContext destroy");
  }, []);

  return (
    <Provider context={FormContext} store={store}>
      {children}
    </Provider>
  );
}
