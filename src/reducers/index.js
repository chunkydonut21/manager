import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeUpdateReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';

export default combineReducers({
  auth: AuthReducer,
  employeeForm: EmployeeUpdateReducer,
  employee: EmployeeReducer
});