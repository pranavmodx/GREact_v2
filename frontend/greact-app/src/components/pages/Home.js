import React, { Component } from "react";
import { connect } from "react-redux";

import Progress from "../layout/Progress";
import Card from "../main/Card";
import Buttons from "../layout/Buttons";

class Home extends Component {
  render() {
    const { loading, error } = this.props;
    if (error) {
      return <h1>Error! {error.message}</h1>;
    }

    if (loading) {
      return <h1>Loading...</h1>;
    }
    return (
      <React.Fragment>
        <div className="container">
          <Progress />
          <Card />
        </div>
        <Buttons />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.gredata.loading,
  error: state.gredata.error,
  currentWord: state.gredata.currentWord
});

export default connect(mapStateToProps)(Home);
