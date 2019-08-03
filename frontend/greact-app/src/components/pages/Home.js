import React, { Component } from "react";
// import { Consumer } from "../../context";
import Progress from "../layout/Progress";
import Card from "../main/Card";
import Buttons from "../layout/Buttons";
import { initializeDataAction } from "../../actions/initializeDataAction";
import { connect } from "react-redux";

class Home extends Component {
  // componentDidMount() {
  //   this.props.initializeData();
  // }
  render() {
    const { loading, error, currentWord } = this.props;
    // console.log(currentWord);
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

export default connect(
  mapStateToProps
  // dispatch => ({
  //   initializeData: () => dispatch(initializeDataAction())
  // })
)(Home);
