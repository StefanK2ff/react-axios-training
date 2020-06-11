import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  deletePostHandler = () => {
    axios
        .delete("/posts/" + this.props.id)
        .then(resp => {
            console.log(resp)
        })
        .catch(err => {
            console.log(err)
        })
    
  }

  componentDidUpdate() {
    if (this.props.id) {
      console.log("[FullPost] componentDidUpdate");
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)
      ) {
        console.log("axios");
        axios
          .get("https://jsonplaceholder.cypress.io/posts/" + this.props.id)
          .then((resp) => {
            this.setState({ loadedPost: resp.data });
          })
          .catch((err) => {
            console.log("error while loading: " + err);
          });
      }
    }
  }

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.id) {
      post = <p style={{ textAlign: "center" }}>Loading...</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
