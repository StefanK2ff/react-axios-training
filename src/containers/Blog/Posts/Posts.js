import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import "./Posts.css"

export default class Posts extends Component {
  state = {
    posts: [],
  };

  articleClickHandler = (id) => {
    this.setState({ selectedPostId: id });
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
    {
      !this.state.loading
        ? (posts = this.state.posts.map((post) => {
            return (
              <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.articleClickHandler(post.id)}
              />
            );
          }))
        : null;
    }

    return <section className="Posts">{posts}</section>;
  }
}
