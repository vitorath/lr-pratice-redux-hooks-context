import React, { useEffect } from "react";
import FormRoot from "./Form/Root";
import HomeRoot from "./Home/Root";
import { useDispatchGlobal, setTokenAction } from "../stores/GlobalProvider";

const inactivityTime = 1000;

let timeoutId = -1;

export default () => {
  const dispatch = useDispatchGlobal();

  useEffect(() => {
    console.log("Loop");
    const getAllEvents = () => {
      const allEvents = [];
      for (let ev in window) {
        if (/^on/.test(ev)) {
          let evt = ev.toString();
          evt = evt.slice(2, evt.length);
          allEvents.push(evt);
        }
      }
      return allEvents;
    };

    const doInactive = () => {
      dispatch(setTokenAction(null));
    };

    const startTimer = () => {
      timeoutId = window.setTimeout(doInactive, inactivityTime);
    };

    const resetTimer = () => {
      window.clearTimeout(timeoutId);
      startTimer();
    };

    const isUsingSystemActiveHandler = () => {
      resetTimer();
    };

    const allEvents = getAllEvents();

    allEvents.forEach(e =>
      window.addEventListener(e, isUsingSystemActiveHandler)
    );

    startTimer();

    return () => {
      allEvents.forEach(e =>
        window.removeEventListener(e, isUsingSystemActiveHandler)
      );
    };
  }, [dispatch]);

  return (
    <>
      <FormRoot />
      <HomeRoot />
    </>
  );
};
