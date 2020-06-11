import React, { Component } from 'react';
//import axios from "axios"
import axios from "../../axios"

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: null,
        loading: true,
        selectedPostId: null,
        error: false
    }
articleClickHandler= (id) => {
    this.setState({selectedPostId: id})
}


componentDidMount() {
    axios.get("/posts")
        .then(res => {
            const receivedPosts = res.data.slice(0, 6);
            const updatedPosts = receivedPosts.map(post => {
                return {
                    ...post,
                    author: "Someone"
                }
            })
            this.setState({posts: updatedPosts, loading: false})
        })
        .catch(err => {
            console.log("There was an error while loading the posts: ", err);
            this.setState({error: true})
        })
}

    render () {
        let posts = "loading";
        if (this.state.error) {posts = "something went wrong, please releoad in 5 seconds."}
        {!this.state.loading
            ? posts = this.state.posts.map(post => {
                return <Post 
                            key={post.id} 
                            title={post.title}
                            author={post.author}
                            clicked={() => this.articleClickHandler(post.id)}
                            />
                })
            : null
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;