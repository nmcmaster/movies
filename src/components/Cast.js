import React from "react";

function Cast(props) {
  if (props.cast.cast.length !== 0) {
    return (
      <p className="mb-3">
        Starring:{" "}
        <span className="font-bold">
          {props.cast.cast[0].name}
          {props.cast.cast.length > 1 ? (
            <span>, {props.cast.cast[1].name}</span>
          ) : (
            ""
          )}
          {props.cast.cast.length > 2 ? (
            <span>, {props.cast.cast[2].name}</span>
          ) : (
            ""
          )}
          {props.cast.cast.length > 3 ? (
            <span>, {props.cast.cast[3].name}</span>
          ) : (
            ""
          )}
        </span>
      </p>
    );
  } else {
    return <p>No cast information available for this movie.</p>;
  }
}

export default Cast;
