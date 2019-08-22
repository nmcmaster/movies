import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Budget from "./Budget";
import Revenue from "./Revenue";
import Cast from "./Cast";
import Crew from "./Crew";
import Review from "./Review";
import Summary from "./Summary";

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
  let extrasArr = [];
  extrasArr = props.extrasArray.filter(i => {
    return i.id === props.info.id;
  });

  return (
    <OutsideClickHandler
      onOutsideClick={e => {
        props.hideModal(e);
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
          alt={props.info.title}
        />
        <div className="rounded-lg border-4">
          <h1 className="MovieModalHeader text-center text-2xl font-extrabold p-2 mr-0 my-1 pb-4 border-b border-gray-200">
            {props.info.title}
          </h1>
          <h3 className="p-3 mb-2 border-b border-gray-200">
            <Cast cast={cast} />
            <Crew cast={cast} />
          </h3>
          <p className="p-3 pt-2 border-b border-gray-200">
            <Summary overview={props.info.overview} />
          </p>
          <Revenue extrasArr={extrasArr} />
          <Budget extrasArr={extrasArr} />
          <p className="pl-3 mt-3">
            Release Date: {props.info.release_date}
            <br />
            Vote Average (out of 10): {props.info.vote_average}{" "}
          </p>
          <div className="p-3">
            <Review reviews={reviews} />
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
}

export default MovieModal;
