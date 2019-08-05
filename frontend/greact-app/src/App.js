import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./store";
import { connect } from "react-redux";

import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Topics from "./components/pages/Topics";
import NotFound from "./components/pages/NotFound";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import UserProfile from "./components/pages/UserProfile";
import Forbidden from "./components/pages/Forbidden";

import { checkAuthState } from "./actions/authAction";
import { initializeDataAction } from "./actions/initializeDataAction";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "antd/dist/antd.css";

class App extends Component {
  componentDidMount() {
    this.props.initializeData();
    this.props.onTryAutoLogin();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/topics" component={Topics} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {this.props.isAuthenticated ? (
              <>
                <Route exact path="/user-profile" component={UserProfile} />
              </>
            ) : (
              <>
                <Route component={Forbidden} />
              </>
            )}

            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

export default connect(
  mapStateToProps,
  dispatch => ({
    initializeData: () => dispatch(initializeDataAction()),
    onTryAutoLogin: () => dispatch(checkAuthState())
  })
)(App);
