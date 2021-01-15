import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import CustomLayout from "./containers/Layout.jsx";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";

class App extends Component {
  async componentDidMount() {
    await this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
