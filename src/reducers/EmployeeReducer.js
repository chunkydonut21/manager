import { EMPLOYEES_FETCH_SUCCESS } from "../actions/index";

const INITIAL_STATE = {};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;