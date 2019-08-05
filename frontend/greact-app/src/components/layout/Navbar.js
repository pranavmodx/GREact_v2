import React, { Component } from "react";
import { Link } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import { connect } from "react-redux";

import { onKeyPressAction } from "../../actions/navbarAction";
import { backToStartAction } from "../../actions/navbarAction";
import { authLogout } from "../../actions/authAction";

import "../layout/Navbar.css";

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: []
    };
  }

  render() {
    const { words, isAuthenticated } = this.props;
    const { value, suggestions } = this.state;

    // React-Autosuggest functions
    const onChange = (event, { newValue, method }) => {
      this.setState({
        value: newValue
      });
    };

    const inputProps = {
      placeholder: "Search Word",
      value,
      onChange: onChange,
      onKeyPress: e => this.props.onKeyPress({ e: e, key: e.key, words: words })
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
    // End of React-Autosuggest Functions

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
          <div className="container">
            <Link
              className="navbar-brand text-success"
              to="/"
              onClick={() => this.props.backToStart()}
            >
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
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-light"
                      to="/login"
                      onClick={() => this.props.logout()}
                    >
                      <i className="fas fa-sign-out-alt" />
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/login">
                      <i className="fas fa-sign-in-alt" />
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/register">
                      <i className="fas fa-user-plus" />
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* React-Autosuggest Search bar form */}
            <form className="form-inline ml-auto">
              <div className="mr-3" onChange={this.onClickChange}>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
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
  }
}

const mapStateToProps = state => ({
  words: state.gredata.words,
  loading: state.auth.loading,
  isAuthenticated: state.auth.token !== null
});

export default connect(
  mapStateToProps,
  dispatch => ({
    onKeyPress: payload => dispatch(onKeyPressAction(payload)),
    backToStart: () => dispatch(backToStartAction()),
    logout: () => dispatch(authLogout())
  })
)(Navbar);
