import React, { useCallback, useEffect } from "react";
import {withRouter} from 'react-router-dom';
import Input from "../../../components/UI/Input/Input";

import {
  useSelectorForm,
  useDispatchForm,
  changeCriteriasAction,
  failAction
} from "../../../stores/FormProvider";
import { requestAction } from "../../../stores/FormSaga";

let locationKey = null;

export default withRouter(({location}) => {
  const dispatch = useDispatchForm();
  const name = useSelectorForm(states => ({ ...states.form.name }));
  const age = useSelectorForm(states => ({ ...states.form.age }));
  const success = useSelectorForm(states => states.success);

  const changeFieldsHandler = useCallback(
    event => {
      const { name, value } = event.target;
      dispatch(changeCriteriasAction(name, value));
    },
    [dispatch]
  );

  useEffect(() => {
    console.log(location.key, locationKey)
    if (locationKey && location.key === locationKey) {
      return;
    }
    dispatch(failAction())
    locationKey =  location.key
    dispatch(requestAction());
    console.log("RegisterForm create");
    return () => console.log("RegisterForm destroy");
  }, [dispatch, location]);

  const buildForm = () => {
    if (!success) {
      return <p>Carregando</p>
    }
    return (
      <fieldset>
        <legend>Register Form</legend>
        <Input
          label="Name"
          type="text"
          value={name.value}
          name={name.name}
          onChange={changeFieldsHandler}
        />
        <Input
          label="Age"
          type="text"
          value={age.value}
          name={age.name}
          onChange={changeFieldsHandler}
        />
      </fieldset>
    )
  };

  return (
    <>
      { buildForm() }
    </>
  );
});
