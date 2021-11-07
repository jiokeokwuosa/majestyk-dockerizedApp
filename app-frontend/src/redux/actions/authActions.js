import API from "./../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  INPUT_CHANGE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  PROCESS_IMAGE_SUCCESS,
  PROCESS_IMAGE_FAILURE 
} from "./types";

export const inputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: INPUT_CHANGE,
      payload: {
        name: name,
        value: value,
      },
    });
  } catch (error) {
    
  }
};
export const registerUser = (user) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.registerUser(user);    
    dispatch({
      type: REGISTER_SUCCESS,
      payload: result.data.data,
    });
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
       'No Error Recieved',
       '201',
        "REGISTER_SUCCESS"
      )
    );
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "REGISTER_FAILURE"
      )
    );
    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};
export const loginUser = (user) => async (
  dispatch
) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.login(user);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: result.data.data,      
    });
    document.body.classList.remove("loading-indicator");    
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "LOGIN_FAILURE"
      )
    );
    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};
export const logOutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_SUCCESS      
    });
  } catch (error) {
    
  }
};
export const processImage = (data) => async (
  dispatch
) => {
  try {
    document.body.classList.add("loading-indicator");
    await API.processImage(data);
    dispatch({
      type: PROCESS_IMAGE_SUCCESS    
    });
    document.body.classList.remove("loading-indicator"); 
    dispatch(
      returnErrors(
       'No Error Recieved',
       '201',
        "PROCESS_IMAGE_SUCCESS"
      )
    );   
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "PROCESS_IMAGE_FAILURE"
      )
    );
    dispatch({
      type: PROCESS_IMAGE_FAILURE,
    });
  }
};
