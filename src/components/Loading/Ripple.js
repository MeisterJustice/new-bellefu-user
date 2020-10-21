import React from "react";
import ripple from "../images/ripple.svg";
import "./ripple.css";

function Ripple({ screen, size }) {
  function getSize(input) {
    let returnSize = 24;
    switch (input.toLowerCase()) {
      case "xs":
        input = 24;
        break;

      case "sm":
        input = 38;
        break;

      case "md":
        input = 45;
        break;

      case "lg":
        input = 60;
        break;

      default:
        input = 24;
        break;
    }

    return returnSize;
  }

  return (
    <div className="_ripple">
      <div className={"_ripple-holder" + " " + screen !== undefined && "_ripple-screen"}>
        <img src={ripple} style={{ width: getSize(size) }} alt="loading icon" />
      </div>
    </div>
  );
}

export default Ripple;
