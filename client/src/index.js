import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./components/App";
import Welcome from "./components/Welcome";
import Signup from "./components/auth/Signup";
import { Provider } from "react-redux";
import { createStore,applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk"
import Feature from "./components/Feature"
import Signout from "./components/auth/Signout"
import Signin from "./components/auth/Signin"
ReactDOM.render(
  <Provider store={createStore(reducers, {
    auth:{authenticated:localStorage.getItem("token")}
  },applyMiddleware(thunk))}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/feature" exact component={Feature} />
        <Route path="/signout" exact component={Signout} />
        <Route path="/signin" exact component={Signin} />


      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
