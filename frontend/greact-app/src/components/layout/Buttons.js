import React, { Component } from "react";
// import { Consumer } from "../../context";
import { onClickAction, onRandomClickAction } from "../../actions/buttonAction";
import { connect } from "react-redux";

class Buttons extends Component {
  render() {
    const { words, currentWord } = this.props;
    return (
      <div className="btn-group mx-auto">
        <button
          name="Previous Word"
          className="btn btn-lg btn-primary"
          onClick={() =>
            this.props.onClick({
              currentWord,
              totalWordsLength: words.length,
              targetName: "Previous Word"
            })
          }
        >
          Previous Word
        </button>
        <button
          name="Random Word"
          className="btn btn-dark px-4"
          onClick={() =>
            this.props.onRandomClick({
              totalWordsLength: words.length,
              targetName: "Random Word"
            })
          }
        >
          <i className="fas fa-random mr-2" />
          Random Word
        </button>
        <button
          name="Next Word"
          className="btn btn-lg btn-primary"
          onClick={() =>
            this.props.onClick({
              currentWord,
              totalWordsLength: words.length,
              targetName: "Next Word"
            })
          }
        >
          Next Word
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  words: state.gredata.words,
  currentWord: state.gredata.currentWord
});

export default connect(
  mapStateToProps,
  dispatch => ({
    onClick: payload => dispatch(onClickAction(payload)),
    onRandomClick: payload => dispatch(onRandomClickAction(payload))
  })
)(Buttons);
