import React from "react";

import { Route, Router, browserHistory } from "react-router";
import Home from "../Components/Home/index";

export default class RouterMap extends React.Component {
  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <div>
            <Route exact path="/" component={Home} />
          </div>
        </Router>
      </div>
    );
  }
}
