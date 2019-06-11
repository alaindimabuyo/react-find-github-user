import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from "../types";

//get dispatch objects that is type and possible payload
export default (state, action) => {
  //evaluate the type
  switch (action.type) {
    case SEARCH_USERS:
      return {
        //return current state
        ...state,
        //users will be filled with payload
        users: action.payload,
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      };
    case SET_LOADING:
      //return what is in the state, state is immutable, we cant reassign we need to make a copy then update
      return {
        //copy using spread operator
        ...state,
        //then update
        loading: true
      };
    default:
      return state;
  }
};
