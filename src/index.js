import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import axios from "./axios/http";
import registerServiceWorker from "./registerServiceWorker";
// 设置域名
import domain from "./Components/domain.js";
global.domain = domain;
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
