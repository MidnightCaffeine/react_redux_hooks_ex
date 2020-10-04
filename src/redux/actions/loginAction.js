import { UPDATE_LOGGED_USER } from "./actions";
export const updateUserId = (userID) => {
  return {
    type: UPDATE_LOGGED_USER,
    payload: userID,
  };
};
