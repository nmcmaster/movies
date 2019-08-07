import React, { Component } from "react";
import MovieModal from "./MovieModal";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      toggle: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.hideWindow = this.hideWindow.bind(this);
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
  render() {
    return (
      <div
        className="w-48 h-56 text-xs bg-gray-300 flex-none overflow-hidden m-4 shadow-xl rounded-lg border border-gray-400"
        onClick={this.showModal}
      >
        <h1 className="font-extrabold text-center p-3 border-b bg-gray-400 border-gray-400 text-shadow ">
          {this.props.info.title}
        </h1>
        <p className="p-3">{this.props.info.overview}</p>
        {this.state.modalView && (
          <MovieModal
            info={this.props.info}
            castArray={this.props.castArray}
            reviewsArray={this.props.reviewsArray}
            hideModal={this.hideModal}
            hideWindow={this.hideWindow}
          />
        )}
      </div>
    );
  }
}

export default Movie;
