import { ADD_USER_INFO } from "./actions";
export const addUserInfo = (userInfoObj) => {
  return {
    type: ADD_USER_INFO,
    payload: userInfoObj,
  };
};
