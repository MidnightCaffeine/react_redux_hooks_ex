import { ADD_USER_INFO } from "../actions/actions";
const initStateUserList = {userData : [
  {
    password: "1111",
    name: "abc",
    userId: "abc",
    country: "India",
  },
  {
    password: "2222",
    name: "def",
    userId: "def",
    country: "Canada",
  },
]};

const userData = (state = initStateUserList, action) => {
  switch (action.type) {
    case ADD_USER_INFO:
      state.userData.push(action.payload);
      return state;
    default:
      return state;
  }
};

export default userData;
