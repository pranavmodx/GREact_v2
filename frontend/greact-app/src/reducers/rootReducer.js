import { combineReducers } from "redux";
import mainReducer from "./mainReducer";
import authReducer from "./authReducer";

export default combineReducers({
  gredata: mainReducer,
  auth: authReducer
});
