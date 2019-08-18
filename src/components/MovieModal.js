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
  const reviewArr = props.reviewsArray.filter(i => {
    return i.id === props.info.id;
  });
  let reviews = [];
  if (reviewArr) {
    reviews = reviewArr[0];
  }
  let reviewText;
  if (reviews.results.length === 0) {
    reviewText = "No reviews available for this movie.";
  } else {
    reviewText = reviews.results[0].content;
  }
  let extrasArr = [];
  extrasArr = props.extrasArray.filter(i => {
    return i.id === props.info.id;
  });
  let budget = "";
  let budgetCSS = "";
  let extras = {};
  extras.budget = 0;
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  if (extrasArr.length !== 0) {
    extras = extrasArr[0];
  }
  if (extras.budget !== 0) {
    budget = numberWithCommas(extras.budget);
    budget = "Budget: $" + budget;
    budgetCSS = "pl-3 mt-3";
  }

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
        className="absolute inset-x-0 top-0 mx-auto mt-32 w-1/2 bg-gray-300 rounded-lg border-4 border-gray-500"
        onClick={props.hideWindow}
      >
        {" "}
        <img
          className="md:w-3/5 sm:w-full md:float-left sm:float-none mr-3 border-gray-500 rounded-br-lg border-r-2 border-b-2"
          src={imgURL}
        />
        <div className="rounded-lg border-4">
          <h1 className="MovieModalHeader text-center text-2xl font-extrabold p-2 mr-0 my-1 pb-4 border-b border-gray-200">
            {props.info.title}
          </h1>
          <h3 className="p-3 mb-2 border-b border-gray-200">
            <p className="mb-3">
              Starring:{" "}
              <span className="font-bold">
                {cast.cast[0].name}, {cast.cast[1].name}, {cast.cast[2].name},{" "}
                {cast.cast[3].name}
              </span>
            </p>
            <p className="mb-1">
              {cast.crew[0].job}:{" "}
              <span className="font-bold">{cast.crew[0].name}</span>
              <br />
            </p>
            <p>
              {cast.crew[1].job}:{" "}
              <span className="font-bold">{cast.crew[1].name}</span>
            </p>
          </h3>
          <p className="p-3 pt-2 border-b border-gray-200">
            <span className="font-bold">Summary: </span>
            <span className="italic">{props.info.overview}</span>
          </p>
          <p className={budgetCSS}>{budget}</p>
          <p className="pl-3 mt-3">
            Popularity: {props.info.popularity} Release Date:{" "}
            {props.info.release_date} Vote Average (out of 10):{" "}
            {props.info.vote_average}{" "}
          </p>
          <p className="p-3">
            <span className="font-bold">Review: </span>
            {reviewText}
          </p>
        </div>
      </div>
    </OutsideClickHandler>
  );
}

export default MovieModal;
