import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Admin from "./Admin";
import history from "./history";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/home" component={Home} exact />
              <Route path="/admin" component={Admin} exact />
              <Route path="/" component={Login} exact />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
