import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../../context";
import Autosuggest from "react-autosuggest";
import "../layout/Navbar.css";

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: []
    };
  }

  backToHome(dispatch) {
    dispatch({ type: "HOME", payload: 0 });
  }

  render() {
    return (
      <Consumer>
        {value2 => {
          const { words, dispatch } = value2;
          const onKeyPress = (dispatch, e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              for (let i = 0; i < words.length; i++) {
                if (
                  words[i].word.toLowerCase() === e.target.value.toLowerCase()
                ) {
                  dispatch({ type: "SHOW_SEARCH_RESULT", payload: i });
                  break;
                }
              }
            }
          };
          const { value, suggestions } = this.state;

          const onChange = (event, { newValue, method }) => {
            this.setState({
              value: newValue
            });
          };

          const inputProps = {
            placeholder: "Search Word",
            value,
            onChange: onChange,
            onKeyPress: onKeyPress.bind(this, dispatch)
          };

          function escapeRegexCharacters(str) {
            return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          }

          function getSuggestions(value) {
            const escapedValue = escapeRegexCharacters(value.trim());

            if (escapedValue === "") {
              return [];
            }

            const regex = new RegExp("^" + escapedValue, "i");

            return words.filter(word => regex.test(word.word));
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

          const onSuggestionsFetchRequested = ({ value }) => {
            this.setState({
              suggestions: getSuggestions(value)
            });
          };

          const onSuggestionsClearRequested = () => {
            this.setState({
              suggestions: []
            });
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
                      <Link
                        className="nav-link text-light"
                        to="/"
                        // onClick={this.backToHome.bind(dispatch)}
                      >
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
                          onSuggestionsFetchRequested
                        }
                        onSuggestionsClearRequested={
                          onSuggestionsClearRequested
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
