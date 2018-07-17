import React from "react";

import { Route, Router, browserHistory } from "react-router";
import Home from "../Components/Home";
import Login from "../Components/Login";
import UserList from "../Components/Pages/userList";
import OrderList from "../Components/Pages/orderList";
import BackParkList from "../Components/Pages/BackParkList/BackParkList";


export default class RouterMap extends React.Component {
  render() {
    return (
      <div>
        <Router history={browserHistory}>
          {/* <Redirect from="/" to="/" /> */}
          <div>
            <Route exact path="/" component={Home}>
              {/* <IndexRoute to="/userList" component={UserList} /> */}
              <Route path="/BackUserList" component={UserList} />
              <Route path="/BackAppointmentOrderList" component={OrderList} />
              <Route path="/BackParkList" component={BackParkList} />
            </Route>
            <Route path="/login" component={Login} />
          </div>
        </Router>
      </div>
    );
  }
}
