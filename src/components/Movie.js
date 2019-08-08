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
  render() {
    if (!this.state.iExist) {
      return "";
    } else {
      return (
        <div
          className="w-48 h-56 text-xs bg-gray-300 flex-none overflow-hidden m-4 shadow-xl rounded-lg border border-gray-400"
          onClick={this.showModal}
        >
          <div
            className="float-right px-1 bg-gray-500 cursor-pointer rounded-bl border-l border-gray-400 text-gray-800 font-sans border-b"
            onClick={this.stopExist}
          >
            x
          </div>
          <h1 className="font-extrabold text-center p-3 border-b bg-gray-400 border-gray-400 text-shadow">
            {this.props.info.title}
          </h1>
          <p className="p-3">{this.props.info.overview}</p>
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
