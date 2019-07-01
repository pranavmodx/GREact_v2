import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../../context";
// import greData from "../../gredata.json";
import Autosuggest from "react-autosuggest";
import axios from "axios";

import "../layout/Navbar.css";

// let words = greData;
let words2 = [];
// console.log(typeof words2);
axios.get("http://127.0.0.1:8000/api/words/").then(res => {
  let w = res.data;
  words2.push(w);
});
// let words = words2[0];
console.log(typeof words2);
console.log(words2.length);
// console.log(words);

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("^" + escapedValue, "i");
  // let words;
  // axios.get("http://127.0.0.1:8000/api/words/").then(res => {words = res.data});
  // console.log(words);
  return words.filter(item => regex.test(item.word));
}

function getSuggestionValue(suggestion) {
  return suggestion.word;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion.word}</span>;
}

function shouldRenderSuggestions(value) {
  return value.trim().length > 1;
}

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onKeyPress = (dispatch, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // console.log(e.target.value);
      // let words;
      // axios
      //   .get("http://127.0.0.1:8000/api/words/")
      //   .then(res => (words = res.data));
      // console.log(words);
      for (let i = 0; i < words.length; i++) {
        if (words[i].word === e.target.value) {
          // console.log("YES");
          dispatch({ type: "SHOW_SEARCH_RESULT", payload: i });
          break;
        }
      }
    }
  };

  render() {
    return (
      <Consumer>
        {value2 => {
          const { dispatch } = value2;
          const { value, suggestions } = this.state;
          const inputProps = {
            placeholder: "Search Word",
            value,
            onChange: this.onChange,
            onKeyPress: this.onKeyPress.bind(this, dispatch)
          };
          return (
            <React.Fragment>
              <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-5">
                <div className="container">
                  <Link className="navbar-brand text-success" to="/">
                    GREact
                  </Link>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="/">
                        <i className="fas fa-home mr-1" />
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="/about">
                        <i className="fas fa-question mr-1" />
                        About
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="/topics">
                        <i className="fas fa-tree mr-1" />
                        Topics
                      </Link>
                    </li>
                  </ul>

                  <form className="form-inline ml-auto">
                    <div className="mr-3" onChange={this.onClickChange}>
                      <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={
                          this.onSuggestionsFetchRequested
                        }
                        onSuggestionsClearRequested={
                          this.onSuggestionsClearRequested
                        }
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        shouldRenderSuggestions={shouldRenderSuggestions}
                        inputProps={inputProps}
                      />
                    </div>
                  </form>
                </div>
              </nav>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Navbar;
