import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import About from "./components/Pages/About";
import Users from "./components/Users/Users";
import User from "./components/Users/User";
import Search from "./components/Users/Search";
import Alert from "./components/layout/Alert";
import "./App.css";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  // state = {
  //   users: [],
  //   loading: false,
  //   alert: null,
  //   user: {},
  //   repos: []
  // };
  //componentdidmount lifecycle and use axios to get data from github api
  // async componentDidMount() {
  //   // set the state to true
  //   this.setState({ loading: true });
  //   const data = await axios.get(
  //     `https://api.github.com/users?client_id${
  //       process.env.REACT_APP_GITHUB_CLIENT_ID
  //     }&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   //reset state to false after you get the data
  //   //push the data in the users empty array
  //   this.setState({ users: data.data, loading: false });
  // }
  //search github users
  const searchUsers = async text => {
    setLoading(true);
    //this.setState({ loading: true });
    const data = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //reset state to false after you get the data
    //push the data in the users empty array
    //this.setState({ users: data.data.items, loading: false });
    setUsers(data.data.items);
    setLoading(false);
  };
  //get single github user
  const getUser = async username => {
    //this.setState({ loading: true });
    setLoading(true);
    const data = await axios.get(
      `https://api.github.com/users/${username}?client_id${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //reset state to false after you get the data
    //push the data in the users empty array
    //this.setState({ user: data.data, loading: false });
    setUser(data.data);
    setLoading(false);
  };
  //get repo of single github user
  const getRepo = async username => {
    //this.setState({ loading: true });
    setLoading(true);
    const data = await axios.get(
      //sort repos by 5 in ascending order
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //reset state to false after you get the data
    //push the data in the repos empty array
    //this.setState({ repos: data.data, loading: false });
    setRepos(data.data);
    setLoading(false);
  };
  //clear users from state
  const clearUsers = () => {
    //this.setState({ users: [], loading: false });
    setUsers([]);
    setLoading(false);
  };
  //set alert when input is empty
  const showAlert = (msg, type) => {
    //pass the 2 parameters as objects in the alert state
    //this.setState({ alert: { msg, type } });
    setAlert({ msg, type });
    //remove alert after 3 seconds
    setTimeout(() => setAlert(null), 3000);
  };
  //destructure

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            {/*HOME ROUTE*/}
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  {/*show clear if there are users */}
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  {/*pass the users components through props */}
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            {/*ABOUT ROUTE*/}
            <Route exact path='/about' component={About} />
            {/*User*/}
            <Route
              exact
              path='/user/:login'
              render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  user={user}
                  loading={loading}
                  getRepo={getRepo}
                  repos={repos}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
