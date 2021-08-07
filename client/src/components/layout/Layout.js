import React from "react";
import Header from "../Header";

function layout(props) {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
}

export default layout;
