import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import { Route } from "react-router-dom";
import FullPost from "./../FullPost/FullPost";
import "./Posts.css";

export default class Posts extends Component {
  state = {
    posts: [],
  };

  articleClickHandler = (id) => {
    //Navigating programatically
    this.props.history.push({ pathname: "/post/" + id });
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then((res) => {
        const receivedPosts = res.data.slice(0, 6);
        const updatedPosts = receivedPosts.map((post) => {
          return {
            ...post,
            author: "Someone",
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch((err) => {
        console.log("There was an error while loading the posts: ", err);
      });
  }

  render() {
    let posts = "loading";
    if (this.state.error) {
      posts = "something went wrong, please releoad in 5 seconds.";
    }

    !this.state.loading
      ? (posts = this.state.posts.map((post) => {
          return (
            //<Link to={"/post/" + post.id} >
            <Post
             key={post.id}
              title={post.title}
              author={post.author}
              clicked={() => this.articleClickHandler(post.id)}
            />
            //</Link>
          );
        }))
      : null;

    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path={this.props.match.url + "post/:id"} exact component={FullPost} />
      </div>
    );
  }
}
