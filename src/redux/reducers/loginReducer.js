import { UPDATE_LOGGED_USER } from "../actions/actions";
const initStateLogged = { loggedUser: ""  };

const logInData = (state = initStateLogged, action) => {
  switch (action.type) {
    case UPDATE_LOGGED_USER:
      return { ...state, loggedUser: action.payload };
    default:
      return state;
  }
};

export default logInData;
