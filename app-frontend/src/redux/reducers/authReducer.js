import {
  INPUT_CHANGE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
 } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user:{},
  token:'',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
      return {
        ...state,
        isAuthenticated:true,
        user:action.payload.user,
        token:action.payload.token
      }
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return{
        ...state,
        isAuthenticated:false,
        user:{}
      }
   
    default:
      return state;
  }
};
export default authReducer;
