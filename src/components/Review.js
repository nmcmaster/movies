import React from "react";

function Review(props) {
  let reviewText;
  let reviewLink = "";
  let reviewAuthor;
  if (props.reviews.results.length === 0) {
    reviewText = "No reviews available for this movie.";
  } else {
    reviewText = props.reviews.results[0].content;
    reviewLink = props.reviews.results[0].url;
    reviewAuthor = props.reviews.results[0].author;
  }
  return (
    <div>
      <span className="font-bold">Review: </span>
      {reviewText}
      <br />
      {reviewLink ? (
        <span>
          <a href={reviewLink} className="text-blue-700 underline" alt="review">
            Review
          </a>{" "}
          by: {reviewAuthor}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

export default Review;
