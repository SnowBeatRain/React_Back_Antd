import React from "react";

import {
  Route,
  Router,
  browserHistory,
  Redirect,
  IndexRoute
} from "react-router";
import Home from "../Components/Home";
import App from "../App";
import UserList from "../Components/Pages/userList";
import OrderList from "../Components/Pages/orderList";

export default class RouterMap extends React.Component {
  render() {
    return (
      <div>
        <Router history={browserHistory}>
          {/* <Redirect from="/" to="/" /> */}
          <div>
            <Route exact path="/" component={Home}>
              {/* <IndexRoute to="/userList" component={UserList} /> */}
              <Route path="/userList" component={UserList} />
              <Route path="/orderList" component={OrderList} />
            </Route>
          </div>
        </Router>
      </div>
    );
  }
}
