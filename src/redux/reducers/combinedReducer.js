import signup from "./signUpReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  signup,
});

export default rootReducer;
