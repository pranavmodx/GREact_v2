import React, { Component } from "react";
import { connect } from "react-redux";

class Progress extends Component {
  render() {
    const { words, currentWord } = this.props;
    return (
      <div className="text-center container mx-auto mb-5">
        <div>
          <h5 className="text-info">
            {currentWord.id + 1} of {words.length}
          </h5>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-info"
            style={{ width: `${currentWord.id / 18}%` }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  words: state.gredata.words,
  currentWord: state.gredata.currentWord
});

export default connect(mapStateToProps)(Progress);
