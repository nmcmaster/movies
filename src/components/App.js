import React, { Component } from "react";
import "./App.css";
import Movie from "./Movie";
import moment from "moment";

const PATH_BASE = "https://api.themoviedb.org/3/discover/movie?";
const API_KEY = "api_key=07b4b9699aaec322c47629fd7878040b";
const year = moment().format("YYYY");
const url = `${PATH_BASE}${API_KEY}&primary_release_year=${year}&sort_by=revenue.desc`;

const castArray = [];
const reviewsArray = [];
const extrasArray = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieInfo: null,
      backdropID: 0,
      idArray: [],
      castArray: [],
      reviewsArray: [],
      extrasArray: [],
      wasDeleted: false,
      toggleReset: false,
      failed: false
    };
    this.backdrop = this.backdrop.bind(this);
  }

  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(result => this.setResult(result))
      .catch(error => error)
      .catch(this.setState({ failed: true }));
    this.timerID = setInterval(() => this.backdrop(), 55000);
  } // initial discover api query

  setResult(result) {
    console.log(result);
    let idArray = result.results.map(i => i.id);
    this.setState({
      movieInfo: result.results,
      idArray: idArray
    });
    this.loadCast();
    this.loadReviews();
    this.timerID = setInterval(() => this.loadExtraMovieInfo(), 10000);
    // TMDB limits to 40 queries every 10 seconds. since the budget data is low-priority, I delay its query
    this.timerID = setInterval(() => this.loadReviews(), 10000);
    // the last one or two of the reviews hit the query cap, so re-query to get them all
  } // setResult writes the response to state and calls functions to perform additional queries on the 20 movies, using their obtained TMDB ids.

  backdrop() {
    let i = 1;

    if (this.state.backdropID === 19) {
      i = -19;
    }
    this.setState({
      backdropID: this.state.backdropID + i
    });
  }

  loadReviews() {
    const reviewsURL1 = "https://api.themoviedb.org/3/movie/";
    const reviewsURL2 = "/reviews?" + API_KEY;
    const idArray = this.state.idArray;
    idArray.map(i => {
      const url = reviewsURL1 + i + reviewsURL2;
      fetch(url)
        .then(response => response.json())
        .then(result => this.setReviews(result))
        .catch(error => error);
    });
  }

  loadExtraMovieInfo() {
    const extraURL1 = "https://api.themoviedb.org/3/movie/";
    const extraURL2 = "?" + API_KEY;
    const idArray = this.state.idArray;
    idArray.map(i => {
      const url = extraURL1 + i + extraURL2;
      fetch(url)
        .then(response => response.json())
        .then(result => this.setExtra(result))
        .catch(error => error);
    });
  }

  setExtra(result) {
    console.log("extras " + result);
    extrasArray.push(result);
    this.setState({ extrasArray });
  }

  setReviews(result) {
    //console.log(result);
    reviewsArray.push(result);
    this.setState({ reviewsArray });
  }

  loadCast() {
    const creditsURL1 = "https://api.themoviedb.org/3/movie/";
    const creditsURL2 = "/credits?" + API_KEY;
    const idArray = this.state.idArray;
    idArray.map(i => {
      const url = creditsURL1 + i + creditsURL2;
      fetch(url)
        .then(response => response.json())
        .then(result => this.setCast(result))
        .catch(error => error);
    });
  }

  setCast(result) {
    //  console.log(result);
    castArray.push(result);
    this.setState({ castArray });
  }

  render() {
    const movies = this.state.movieInfo;
    let backdropID = this.state.backdropID;
    if (!movies) {
      return (
        <div className="p-20 text-center text-white font-serif text-xl">
          Fetching movie info...
        </div>
      );
    }
    const backdrop = this.state.movieInfo[backdropID].backdrop_path;
    const imageUrl = `https://image.tmdb.org/t/p/original${backdrop}`;
    return (
      <div
        className="App pb-12 font-serif border-b-8 border-l-8 border-r-8 border-gray-400 container w-3/4 bg-gray-800 mx-auto shadow-lg flex flex-wrap justify-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="w-full bg-gray-300 text-center MovieHeader py-2 pb-3 text-xl font-bold">
          <span className="md:inline sm:hidden">
            TOP <span className="text-2xl"> 20 </span> MOST
          </span>{" "}
          PROFITABLE MOVIES OF <span className="text-2xl"> {year} </span>
        </div>
        <div className="flex flex-wrap justify-center">
          {movies.map(i => (
            <Movie
              key={i.id}
              info={i}
              castArray={this.state.castArray}
              reviewsArray={this.state.reviewsArray}
              extrasArray={this.state.extrasArray}
              wasDeleted={this.state.wasDeleted}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
