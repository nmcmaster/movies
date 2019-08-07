import React from "react";
import OutsideClickHandler from "react-outside-click-handler";

function MovieModal(props) {
  let cast = props.castArray.filter(i => {
    return i.id === props.info.id;
  });
  cast = cast[0];
  const baseURL = "https://image.tmdb.org/t/p/w500";
  const imgPath = props.info.poster_path;
  const imgURL = baseURL + imgPath;
  const review = props.reviewsArray[0].results[0].content;
  console.log(review);
  return (
    <OutsideClickHandler
      onOutsideClick={e => {
        {
          {
            props.hideModal(e);
          }
        }
      }}
    >
      <div
        className="absolute inset-x-0 top-0 mx-auto mt-32 w-1/2 bg-gray-300 flex"
        onClick={props.hideWindow}
      >
        {" "}
        <img className="w-3/5" src={imgURL} />
        <div>
          <h1>{props.info.title}</h1>
          <h3>
            {cast.cast[0].name}, {cast.cast[1].name}, {cast.cast[2].name},{" "}
            {cast.cast[3].name}
          </h3>
          <p>{props.info.overview}</p>
          <p>{review}</p>
        </div>
      </div>
    </OutsideClickHandler>
  );
}

export default MovieModal;
