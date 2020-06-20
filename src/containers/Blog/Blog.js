import React, { Component } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import async from "../../hoc/async"

import "./Blog.css";
import Posts from "./Posts/Posts";


const AsyncNewPost = async(() => import("./NewPost/NewPost"));

class Blog extends Component {
    state = {
        authed: true
    }

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/new" exact>
                  New
                </NavLink>
                {/* pathname: this.props.match.url + "/relative-path" */}
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          
          {this.state.authed ? <Route path="/new" exact component={AsyncNewPost}  /> : null }
          <Redirect from="/new" to="/" />
          {/* <Route render={() => <h1>Not found</h1>} /> */}
          <Route path="/" component={Posts} />
           
        </Switch>
      </div>
    );
  }
}

export default Blog;
