import React from "react";
import Header from "../Header";

function layout(props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      {props.children}
    </div>
  );
}

export default layout;
