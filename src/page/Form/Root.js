import React, { useEffect } from "react";
import { Route } from "react-router-dom";

import FormProvider, {
  useDispatchForm,
  clearAction
} from "../../stores/FormProvider";
import RegisterFormPage from "./Register/RegisterFormPage";
import CounterFormPage from "./Counter/CounterFormPage";
import ExactRouter from "../../hoc/ExactRouter";
import CounterLocalProvider from "../../stores/CounterLocalProvider";
import CounterLocalFormPage from "./CounterLocal/CounterLocalFormPage";

const Wrapper = () => {
  const dispatch = useDispatchForm();
  useEffect(() => {
    console.log("FormRootWrapper create");
    return () => {
      console.log("FormRootWrapper destroy");
      dispatch(clearAction());
    };
  }, [dispatch]);

  return (
    <>
      <ExactRouter path="/form" component={<RegisterFormPage />} />
      <Route exact path="/form/counter" component={CounterFormPage} />
      <CounterLocalProvider>
        <Route exact path="/form/counter/local" component={CounterLocalFormPage} />
      </CounterLocalProvider>
    </>
  );
};

export default () => {
  useEffect(() => {
    console.log("FormRoot create");
    return () => console.log("FormRoot destroy");
  }, []);

  return (
    <FormProvider>
      <Route path="/form" component={Wrapper} />
    </FormProvider>
  );
};
