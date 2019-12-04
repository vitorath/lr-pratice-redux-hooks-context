import React from "react";

import "./App.css";
import GlobalProvider from "./stores/GlobalProvider";

import Root from "./page/Root";

function App() {
  return (
    <GlobalProvider>
      <Root />
    </GlobalProvider>
  );
}

export default React.memo(App);
