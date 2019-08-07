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
  let reviews = props.reviewsArray.filter(i => {
    return i.id === props.info.id;
  });
  reviews = reviews[0];
  let reviewText;
  if (reviews.results.length === 0) {
    reviewText = "No reviews available for this movie.";
  } else {
    reviewText = reviews.results[0].content;
  }
  //  const review = reviews[0].results[0].content;
  console.log(reviews);
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
        className="absolute inset-x-0 top-0 mx-auto mt-32 w-1/2 bg-gray-300"
        onClick={props.hideWindow}
      >
        {" "}
        <img className="w-3/5 float-left mr-3" src={imgURL} />
        <div>
          <h1 className="text-center text-2xl font-extrabold p-3 mt-3 mb-1">
            {props.info.title}
          </h1>
          <h3 className="p-3 mb-2">
            Starring:{" "}
            <span className="font-bold">
              {cast.cast[0].name}, {cast.cast[1].name}, {cast.cast[2].name},{" "}
              {cast.cast[3].name}
            </span>
          </h3>
          <p className="p-3">
            <span className="font-bold">Summary: </span>
            <span className="italic">{props.info.overview}</span>
          </p>
          <p className="p-3">{reviewText}</p>
        </div>
      </div>
    </OutsideClickHandler>
  );
}

export default MovieModal;
