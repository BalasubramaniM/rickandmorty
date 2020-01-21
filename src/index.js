import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { HomePage } from "./components";

const App = () => {
  useEffect(() => {
    console.log("App");
  }, []);

  return (
    <div>
      <HomePage />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));
