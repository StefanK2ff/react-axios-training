import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";

import "./Blog.css";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import FullPost from "./FullPost/FullPost";

class Blog extends Component {
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
          
          <Route path="/new" exact component={NewPost} />
          <Route path="/"  component={Posts} />
        </Switch>
      </div>
    );
  }
}

export default Blog;
