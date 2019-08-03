import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Consumer } from "../../context";
import { onClickAction } from "../../actions/loadTopicAction";
import { connect } from "react-redux";
import { initializeDataAction } from "../../actions/initializeDataAction";

class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      topicsPerPage: 10
    };
  }

  paginate(number, pageCount) {
    if (number !== 0 && number !== pageCount)
      this.setState({ currentPage: number });
  }

  componentDidMount() {
    // this.props.initializeData();
  }

  render() {
    const { words, topicIDS } = this.props;
    console.log(words);
    console.log(topicIDS);
    const indexOfLastTopic = this.state.topicsPerPage * this.state.currentPage;
    const indexOfFirstTopic = indexOfLastTopic - this.state.topicsPerPage;
    const currentTopicIDS = topicIDS.slice(indexOfFirstTopic, indexOfLastTopic);

    const pageCount = Math.ceil(topicIDS.length / currentTopicIDS.length);
    let pageNumbers;
    const midPages = [];

    for (
      let i = this.state.currentPage - 3;
      i < this.state.currentPage + 3;
      i++
    ) {
      if (i > 0 && i < pageCount) {
        midPages.push(i);
      }
    }
    pageNumbers = [0, ...midPages, pageCount];

    return (
      <div className="container">
        <h1 className="display-3 mb-3">Topics</h1>
        <ul
          className="list-group text-left"
          style={{ display: "inline-block" }}
        >
          {currentTopicIDS.map((id, idx) => (
            <li key={idx} className="list-group-item bg-light">
              <Link
                to="/"
                className="text-info"
                style={{ textDecoration: "none" }}
                onClick={() => this.props.onClick({ id: id })}
              >
                {words[id].topic}
              </Link>
            </li>
          ))}

          <ul className="pagination">
            {pageNumbers.map(number => (
              <li className="page-item" key={number}>
                <a
                  className="page-link"
                  onClick={this.paginate.bind(this, number, pageCount)}
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  words: state.gredata.words,
  topicIDS: state.gredata.topicIDS
});

export default connect(
  mapStateToProps,
  dispatch => ({
    onClick: payload => dispatch(onClickAction(payload)),
    initializeData: () => dispatch(initializeDataAction())
  })
)(Topics);
