import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import HomePage from "./HomePage";
import SignUp from "./SignUp";
import PrivateRoute from "../components/PrivateRoute";
import "./styles.scss";

//Main : Main component, Router setup done here
const Main = () => {
  return (
    <div className="main_container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/HomePage" component={HomePage} />
          <Route path="/SignUp" component={SignUp} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Main;
