import React, { Component } from "react";
import MovieModal from "./MovieModal";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      toggle: false,
      iExist: true
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.hideWindow = this.hideWindow.bind(this);
    this.stopExist = this.stopExist.bind(this);
  }
  showModal() {
    if (!this.state.toggle) {
      this.setState({
        modalView: true,
        toggle: true
      });
    } else {
      this.setState({
        modalView: false,
        toggle: false
      });
    }
  }
  hideModal(e) {
    this.setState({ modalView: false });
  }
  hideWindow(e) {
    this.setState({ modalView: false });
    console.log("hide Window worked");
  }
  stopExist(e) {
    this.setState({ iExist: false });
    e.stopPropagation();
  }
  reinstate() {
    this.setState({ iExist: true });
  }
  render() {
    const baseImageUrl = "https://image.tmdb.org/t/p/w300";
    const imageUrl = baseImageUrl + this.props.info.backdrop_path;
    if (!this.state.iExist) {
      return "";
    } else {
      return (
        <div
          className="w-48 h-56 text-xs bg-gray-300 flex-none overflow-hidden m-4 shadow-inner hover:bg-gray-200 hover:border-gray-300 shadow-2xl rounded-lg border border-gray-400"
          onClick={this.showModal}
        >
          <div
            className="float-right px-1 bg-gray-500 cursor-pointer rounded-bl border-l border-gray-400 text-gray-900 font-sans border-b"
            onClick={this.stopExist}
          >
            x
          </div>
          <h1 className="MovieHeader font-extrabold text-center p-3 border-b bg-gray-400 border-gray-100 text-shadow">
            {this.props.info.title}
          </h1>
          <p
            className="Movie p-3 min-h-full"
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            {this.props.info.overview}
          </p>
          {this.state.modalView && (
            <MovieModal
              info={this.props.info}
              castArray={this.props.castArray}
              reviewsArray={this.props.reviewsArray}
              extrasArray={this.props.extrasArray}
              hideModal={this.hideModal}
              hideWindow={this.hideWindow}
            />
          )}
        </div>
      );
    }
  }
}

export default Movie;
