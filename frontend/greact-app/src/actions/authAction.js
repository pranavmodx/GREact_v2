import axios from "axios";

export const authStart = () => ({
  type: "AUTH_Start"
});

export const authSuccess = token => ({
  type: "AUTH_SUCCESS",
  payload: token
});

export const authFailure = error => ({
  type: "AUTH_FAIL",
  payload: error
});

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: "AUTH_LOGOUT"
  };
};

export const checkAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(authLogout());
  }, expirationTime * 1000);
};

const setTokenToLocalStorage = key => dispatch => {
  const token = key;
  const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
  localStorage.setItem("token", token);
  localStorage.setItem("expirationDate", expirationDate);
  dispatch(authSuccess(token));
  dispatch(checkAuthTimeout(3600));
};

export const authLogin = (username, password) => dispatch => {
  dispatch(authStart());
  axios
    .post("http://127.0.0.1:8000/rest-auth/login/", {
      username: username,
      password: password
    })
    .then(res => {
      dispatch(setTokenToLocalStorage(res.data.key));
    })
    .catch(error => {
      dispatch(authFailure(error));
    });
};

export const authSignup = (
  username,
  email,
  password1,
  password2
) => dispatch => {
  dispatch(authStart);
  axios
    .post("http://127.0.0.1:8000/rest-auth/registration/", {
      username: username,
      email: email,
      password1: password1,
      password2: password2
    })
    .then(res => {
      dispatch(setTokenToLocalStorage(res.data.key));
    })
    .catch(error => {
      dispatch(authFailure(error));
    });
};

export const checkAuthState = () => dispatch => {
  const token = localStorage.getItem("token");
  if (token === undefined) {
    dispatch(authLogout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date()) {
      dispatch(authLogout());
    } else {
      dispatch(authSuccess(token));
      dispatch(
        checkAuthTimeout((expirationDate - new Date().getTime()) / 1000)
      );
    }
  }
};
