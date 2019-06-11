//initial state, action when we search users and make request to github API
import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./GithubContext";
import GithubReducer from "./GithubReducer";
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}
//initial state , global state
const GithubState = props => {
  const initialState = {
    user: {},
    users: [],
    repos: [],
    loading: false
  };
  //dispatch a type back to reducer,
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //search user
  const searchUsers = async text => {
    setLoading();
    //this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id${githubClientId}&client_secret${githubClientSecret}`
    );
    //reset state to false after you get the data
    //push the data in the users empty array
    //this.setState({ users: data.data.items, loading: false });

    //dispatch to reducer , payload is the data we want to send
    //this dispatch is responsible for putting it into out state and sending it down to the components that needs it
    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };
  //get user
  //get single github user
  const getUser = async username => {
    //this.setState({ loading: true });
    setLoading();
    const data = await axios.get(
      `https://api.github.com/users/${username}?client_id${githubClientId}&client_secret${githubClientSecret}`
    );
    //reset state to false after you get the data
    //push the data in the users empty array
    //this.setState({ user: data.data, loading: false });
    dispatch({
      type: GET_USER,
      payload: data.data
    });
  };
  //get repos
  //get repo of single github user
  const getRepo = async username => {
    //this.setState({ loading: true });
    setLoading();
    const data = await axios.get(
      //sort repos by 5 in ascending order
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id${githubClientId}&client_secret${githubClientSecret}`
    );
    //reset state to false after you get the data
    //push the data in the repos empty array
    //this.setState({ repos: data.data, loading: false });
    dispatch({
      type: GET_REPOS,
      payload: data.data
    });
  };
  //clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });
  //set loading
  //dispatch to our GithubReducer from useReducer hook
  const setLoading = () => dispatch({ type: SET_LOADING });
  //return provider that will pass props
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getRepo
      }}
    >
      {/*wrap the entire application with the provider*/}
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
