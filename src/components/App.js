import React, { Component } from "react";
import "./App.css";
import Movie from "./Movie";

const DEFAULT_QUERY = "";

const PATH_BASE = "https://api.themoviedb.org/3/discover/movie?";
const API_KEY = "api_key=07b4b9699aaec322c47629fd7878040b";
const url = `${PATH_BASE}${API_KEY}`;

const castArray = [];
const reviewsArray = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieInfo: null,
      backdropID: 0,
      idArray: [],
      castArray: [],
      reviewsArray: []
    };
    this.backdrop = this.backdrop.bind(this);
  }

  backdrop() {
    let i = 1;

    if (this.state.backdropID === 19) {
      i = -19;
    }

    // console.log(i);
    this.setState({
      backdropID: this.state.backdropID + i
    });
    console.log("worked");
    console.log(this.state.backdropID);
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

  setReviews(result) {
    console.log(result);
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
    console.log(result);
    castArray.push(result);
    this.setState({ castArray });
  }

  setResult(result) {
    let idArray = result.results.map(i => i.id);
    this.setState({
      movieInfo: result.results,
      idArray: idArray
    });
    console.log(idArray);
    this.loadCast();
    this.loadReviews();
    //  console.log(this.state.movieInfo);
  }

  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(result => this.setResult(result))
      .catch(error => error);
    this.timerID = setInterval(() => this.backdrop(), 65000);
  }

  render() {
    const movies = this.state.movieInfo;
    let backdropID = this.state.backdropID;
    if (!movies) {
      return null;
    }
    const backdrop = this.state.movieInfo[backdropID].backdrop_path;
    const imageUrl = `https://image.tmdb.org/t/p/original${backdrop}`;
    return (
      <div
        className="App border border-l-8 border-r-8 border-gray-400 container w-3/4 bg-gray-800 mx-auto shadow-lg flex flex-wrap justify-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {movies.map(i => (
          <Movie
            key={i.id}
            info={i}
            castArray={this.state.castArray}
            reviewsArray={this.state.reviewsArray}
          />
        ))}
      </div>
    );
  }
}

export default App;
