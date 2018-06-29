import React, { Component } from "react";
import "./App.css";
// import Button from "antd/lib/button";
// import { Button } from "antd";
import RouterMap from "./Router/RouterMap";
class App extends Component {
  render() {
    return (
      <div className="App">
        <RouterMap />
      </div>
    );
  }
}

export default App;
