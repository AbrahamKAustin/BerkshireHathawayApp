import React from "react";
import { AppRegistry } from "react-native";

import LoginSignup from "./components/LoginSignup";

const App = () => {
  return (
    <LoginSignup />
  );
};

AppRegistry.registerComponent("BerkshireHathaway", () => App);

export default App;