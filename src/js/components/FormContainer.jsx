import React, { useEffect } from "react";
import ReactDOM from 'react-dom';

const FormComp = () => {
  useEffect(() => {
    console.log("Form Container");
  }, []);

  return <p>heys</p>;
};

ReactDOM.render(<FormComp />, document.getElementById("container"));

