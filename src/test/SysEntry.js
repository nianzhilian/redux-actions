import React from "react";
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import { Login } from "../page/Login";
import Admin from "../page/Admin";
import Home from "../page/Home";
import history from "./history";
import { ConnectedRouter } from "connected-react-router";

function NotFound() {
  return <div>404</div>;
}

class SysEntry extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
            <Route  path="/login" component={Login}></Route>
            <Route  path="/" component={Admin}></Route>
            <Route  component={NotFound}></Route>
        </Switch>
      </ConnectedRouter>
    );
  }
}
export default SysEntry;
