import React from "react";

function Crew(props) {
  if (props.cast.crew.length !== 0) {
    return (
      <div>
        <p className="mb-1">
          {props.cast.crew[0].job}:{" "}
          <span className="font-bold">{props.cast.crew[0].name}</span>
          <br />
        </p>
        {props.cast.crew.length > 1 ? (
          <p>
            {props.cast.crew[1].job}:{" "}
            <span className="font-bold">{props.cast.crew[1].name}</span>
          </p>
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return <p>No crew information available for this movie.</p>;
  }
}

export default Crew;
