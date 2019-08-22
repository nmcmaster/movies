import React from "react";

function Summary(props) {
  return (
    <span>
      <span className="font-bold">Summary: </span>
      <span className="italic">{props.overview}</span>
    </span>
  );
}

export default Summary;
