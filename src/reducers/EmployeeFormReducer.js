import { EMPLOYEE_UPDATE, EMPLOYEE_CREATED, EMPLOYE_SAVED } from "../actions/index";

const INITITAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};

const reducer = (state = INITITAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE :
      return { ...state, [action.payload.prop]: action.payload.value };
    case EMPLOYEE_CREATED:
      return INITITAL_STATE;
    case EMPLOYE_SAVED:
      return INITITAL_STATE;
    default:
      return state;
  }
}

export default reducer;