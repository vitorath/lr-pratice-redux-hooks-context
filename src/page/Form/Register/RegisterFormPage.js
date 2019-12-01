import React, { useCallback, useEffect } from "react";
import Input from "../../../components/UI/Input/Input";

import {
  useSelectorForm,
  useDispatchForm,
  changeCriteriasAction
} from "../../../stores/FormProvider";

export default () => {
  const dispatch = useDispatchForm();
  const name = useSelectorForm(states => ({ ...states.form.name }));
  const age = useSelectorForm(states => ({ ...states.form.age }));

  const changeFieldsHandler = useCallback(
    event => {
      const { name, value } = event.target;
      dispatch(changeCriteriasAction(name, value));
    },
    [dispatch]
  );

  useEffect(() => {
    console.log("RegisterForm create");
    return () => console.log("RegisterForm destroy");
  }, []);

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
  );
};
