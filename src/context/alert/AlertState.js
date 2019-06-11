//initial state, action when we search users and make request to github API
import React, { useReducer } from "react";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

//initial state , global state
const AlertState = props => {
  const initialState = null;
  //dispatch a type back to reducer,
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //set alert when input is empty
  const setAlert = (msg, type) => {
    //pass the 2 parameters as objects in the alert state
    //this.setState({ alert: { msg, type } });
    dispatch({
      type: SET_ALERT,
      payload: { msg, type }
    });
    //remove alert after 3 seconds
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
  };
  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert
      }}
    >
      {/*wrap the entire application with the provider*/}
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
