import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

let topicIDS2 = [];

axios.get("http://127.0.0.1:8000/api/words/").then(res => {
  let greData = res.data;

  for (let i = 0; i < greData.length; i++) {
    if (i === 0) {
      topicIDS2.push(greData[i].id);
    } else if (greData[i].topic !== greData[i - 1].topic) {
      topicIDS2.push(greData[i].id);
    }
  }
});

// console.log(topicIDS2);

const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_WORD":
      return {
        ...state,
        // Magic line
        currentTopicNo:
          Number(state.words[action.payload].topic.slice(0, 3)) - 1,
        currentWord: state.words[action.payload]
      };
    case "SHOW_RANDOM_WORD":
      return {
        ...state,
        currentTopicNo:
          Number(state.words[action.payload].topic.slice(0, 3)) - 1,
        currentWord: state.words[action.payload]
      };
    case "SHOW_TOPIC":
      return {
        ...state,
        currentTopicNo: action.payload,
        currentWord: state.words[state.topicIDS[action.payload]]
      };
    case "LOAD_TOPIC":
      return {
        ...state,
        currentTopicNo:
          Number(state.words[action.payload].topic.slice(0, 3)) - 1,
        currentWord: state.words[action.payload]
      };
    case "SHOW_SEARCH_RESULT":
      return {
        ...state,
        currentTopicNo:
          Number(state.words[action.payload].topic.slice(0, 3)) - 1,
        currentWord: state.words[action.payload]
      };
    case "HOME":
      return { 
        ...state,
        currentWord: state.words[0],
        currentTopicNo: 0,
        topicIDS: topicIDS2
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    words: [],
    currentWord: {},
    currentTopicNo: 0,
    topicIDS: topicIDS2,
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/words/").then(res => {
      this.setState({ words: res.data, currentWord: res.data[0] });
      // console.log(res.data);
    });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
