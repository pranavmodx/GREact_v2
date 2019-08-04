const initialState = {
  token: null,
  error: null,
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        loading: true
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        token: action.payload,
        loading: false
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case "AUTH_LOGOUT":
      return {
        ...state,
        token: null
      };
    default:
      return {
        ...state
      };
  }
};

export default authReducer;
