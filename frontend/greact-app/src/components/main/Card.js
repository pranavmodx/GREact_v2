import React, { Component } from "react";
// import { Consumer } from "../../context";
import { fetchTopicAction } from "../../actions/fetchTopicAction";
import { connect } from "react-redux";

class Card extends Component {
  render() {
    const { words, currentTopicNo, currentWord, topicIDS } = this.props;
    // console.log(currentWord);
    // console.log(topicIDS);
    // console.log(currentTopicNo);
    return (
      <div className="container w-75">
        <div className="card mb-4">
          <div className="card-header bg-success pt-4 mb-3">
            <div className="h1">
              <button
                name="Previous Topic"
                className="btn float-left btn-success text-dark btn-lg"
                onClick={() =>
                  this.props.fetchTopic({
                    currentTopicNo,
                    topicIDS,
                    targetName: "Previous Topic"
                  })
                }
              >
                <i name="Previous Topic" className="fas fa-chevron-left" />
              </button>
              <span className="font-weight-bold mr-3">Topic:</span>
              {currentWord.topic}
              <span className="ml-3 badge badge-dark badge-pill">
                {topicIDS[currentTopicNo + 1]
                  ? topicIDS[currentTopicNo + 1] - topicIDS[currentTopicNo]
                  : words.length - topicIDS[currentTopicNo]}
              </span>
              <button
                name="Next Topic"
                className="btn float-right btn-success text-dark btn-lg"
                onClick={() =>
                  this.props.fetchTopic({
                    currentTopicNo,
                    topicIDS,
                    targetName: "Next Topic"
                  })
                }
              >
                <i name="Next Topic" className="fas fa-chevron-right" />
              </button>
            </div>
          </div>
          <div className="card-body">
            <ul className="list-group text-left">
              <li className="list-group-item bg-light text-info h3 mb-3">
                <span className="font-weight-bold text-info mr-1">Word:</span>
                {currentWord.word}
              </li>
              <li className="list-group-item bg-light h5">
                <span className="font-weight-bold mr-1">Meaning:</span>
                {currentWord.meaning}
              </li>
              <li className="list-group-item bg-light h5">
                <span className="font-weight-bold mr-1">Sentence:</span>
                {currentWord.sentence}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  words: state.gredata.words,
  currentTopicNo: state.gredata.currentTopicNo,
  currentWord: state.gredata.currentWord,
  topicIDS: state.gredata.topicIDS
});

export default connect(
  mapStateToProps,
  dispatch => ({
    fetchTopic: payload => dispatch(fetchTopicAction(payload))
  })
)(Card);
