import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../../context";
import TopicsPagination from "../pages/TopicsPagination";

class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      topicsPerPage: 10
    };
  }

  onClick(id, dispatch) {
    dispatch({ type: "LOAD_TOPIC", payload: id });
  }

  paginate(number) {
    this.setState({currentPage : number});
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { words, topicIDS, dispatch } = value;
          const indexOfLastTopic =
            this.state.topicsPerPage * this.state.currentPage;
          console.log(indexOfLastTopic);
          const indexOfFirstTopic = indexOfLastTopic - this.state.topicsPerPage;
          console.log(indexOfLastTopic);
          const currentTopicIDS = topicIDS.slice(
            indexOfFirstTopic,
            indexOfLastTopic
          );
          console.log(currentTopicIDS);

          // const currentTopicIDS2 = [];
          // for (let i = 0; i < currentTopicIDS.length; i++) {
          //   if (i == 0 || i == currentTopicIDS.length - 1)
          //     currentTopicIDS2.push(currentTopicIDS[i]);
          // }

          const pageCount = Math.ceil(topicIDS.length / currentTopicIDS.length);
          console.log(pageCount);

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
                      onClick={this.onClick.bind(this, id, dispatch)}
                    >
                      {words[id].topic}
                    </Link>
                  </li>
                ))}
                <TopicsPagination
                  pageCount={pageCount}
                  currentPage={this.state.currentPage}
                  paginate={this.paginate}
                />
              </ul>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Topics;
