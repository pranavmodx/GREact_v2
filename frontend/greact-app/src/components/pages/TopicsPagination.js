import React, { Component } from "react";
import { Consumer } from "../../context";


class TopicsPagination extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { currentPage, pageCount, paginate } = this.props;
          const midPages = [];
          for (let i = currentPage - 3; i < currentPage + 3; i++) {
            if (i > 0 && i < pageCount) {
              midPages.push(i);
            }
          }
          let pageNumbers = [0, ...midPages, pageCount];

          return (
            <div className="container text-center mt-2">
              <ul className="pagination">
                {pageNumbers.map(number => (
                  <li className="page-item" key={number}>
                    <a
                      className="page-link"
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default TopicsPagination;
