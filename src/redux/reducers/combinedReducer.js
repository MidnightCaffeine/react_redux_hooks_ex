import signup from "./signUpReducer";
import logInData from "./loginReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  signup,
  logInData,
});

export default rootReducer;
