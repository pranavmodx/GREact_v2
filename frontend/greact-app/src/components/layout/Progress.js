import React, { Component } from "react";
import { Consumer } from "../../context";

class Progress extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { words, currentWord } = value;
          // console.log(currentWord);
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
        }}
      </Consumer>
    );
  }
}

export default Progress;
