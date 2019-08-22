import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Budget from "./Budget";

function MovieModal(props) {
  const baseURL = "https://image.tmdb.org/t/p/w500";
  const imgPath = props.info.poster_path;
  const imgURL = baseURL + imgPath;
  let cast = {}; // have to do some acrobatics because if their aren't results from api, the undefined object will break my if statements
  cast.cast = [];
  cast.crew = [];
  let castArr = props.castArray.filter(i => {
    return i.id === props.info.id;
  });
  if (castArr.length !== 0) {
    cast = castArr[0];
  }
  const reviewArr = props.reviewsArray.filter(i => {
    return i.id === props.info.id;
  });
  let reviews = {};
  reviews.results = [];
  if (reviewArr.length !== 0) {
    reviews = reviewArr[0];
  }
  let reviewText;
  let reviewLink = "";
  let reviewAuthor;
  if (reviews.results.length === 0) {
    reviewText = "No reviews available for this movie.";
  } else {
    reviewText = reviews.results[0].content;
    reviewLink = reviews.results[0].url;
    reviewAuthor = reviews.results[0].author;
  }
  let extrasArr = [];
  extrasArr = props.extrasArray.filter(i => {
    return i.id === props.info.id;
  });
  let revenue = ""; //complete this!
  let revenueCSS = "pl-3 mt-3";

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
        className="fixed inset-x-0 top-0 mx-auto mt-10 overflow-x-auto sm:w-1/2 w-5/6 bg-gray-300 rounded-lg border-4 border-gray-500 hover:bg-gray-300 hover:text-black"
        onClick={props.hideWindow}
        style={{ maxHeight: "90%" }}
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
            {cast.cast.length !== 0 ? (
              <p className="mb-3">
                Starring:{" "}
                <span className="font-bold">
                  {cast.cast[0].name}
                  {cast.cast.length > 1 ? (
                    <span>, {cast.cast[1].name}</span>
                  ) : (
                    ""
                  )}
                  {cast.cast.length > 2 ? (
                    <span>, {cast.cast[2].name}</span>
                  ) : (
                    ""
                  )}
                  {cast.cast.length > 3 ? (
                    <span>, {cast.cast[3].name}</span>
                  ) : (
                    ""
                  )}
                </span>
              </p>
            ) : (
              <p>No cast information available for this movie.</p>
            )}
            {cast.crew.length !== 0 ? (
              <div>
                <p className="mb-1">
                  {cast.crew[0].job}:{" "}
                  <span className="font-bold">{cast.crew[0].name}</span>
                  <br />
                </p>
                {cast.crew.length > 1 ? (
                  <p>
                    {cast.crew[1].job}:{" "}
                    <span className="font-bold">{cast.crew[1].name}</span>
                  </p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <p>No crew information available for this movie.</p>
            )}
          </h3>
          <p className="p-3 pt-2 border-b border-gray-200">
            <span className="font-bold">Summary: </span>
            <span className="italic">{props.info.overview}</span>
          </p>
          <Budget extrasArr={extrasArr} />
          <p className="pl-3 mt-3">
            Release Date: {props.info.release_date}
            <br />
            Vote Average (out of 10): {props.info.vote_average}{" "}
          </p>
          <p className="p-3">
            <span className="font-bold">Review: </span>
            {reviewText}
            <br />
            {reviewLink ? (
              <span>
                <a
                  href={reviewLink}
                  className="text-blue-700 underline"
                  alt="review"
                >
                  Review
                </a>{" "}
                by: {reviewAuthor}
              </span>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
    </OutsideClickHandler>
  );
}

export default MovieModal;
