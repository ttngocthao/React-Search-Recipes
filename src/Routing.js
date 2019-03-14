import React from "react";
import App from "./App";
import DishDetail from "./DishDetail";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
const Routing = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/DishDetail/:id" component={DishDetail} />
    </Switch>
  </Router>
);
export default Routing;
