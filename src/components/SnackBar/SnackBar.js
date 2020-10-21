import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsDisplay } from "react-icons/bs";

function SnackBar({ type, children }) {
  const [timeout, settimeout] = useState("");
  const getType = (val) => {
    let color = "";

    switch (val.toLowerCase()) {
      case "error":
        color = "#cf000f";
        break;

      case "warning":
        color = "#f0541e";
        break;

      case "success":
        color = "#009944";
        break;

      default:
        color = "#808080";
        break;
    }

    return color;
  };

  const style = {
    root: {
      backgroundColor: getType(type),
      color: "#fff",
      minWidth: "220px",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      settimeout("close");
    }, 2800);
  }, []);

  return (
    <div className={`_snackbar ${timeout}`} style={style.root}>
      {children}
    </div>
  );
}

export default SnackBar;
