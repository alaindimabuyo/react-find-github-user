import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import About from "./components/Pages/About";
import Users from "./components/Users/Users";
import User from "./components/Users/User";
import Search from "./components/Users/Search";
import Alert from "./components/layout/Alert";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
    user: {},
    repos: []
  };
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
  searchUsers = async text => {
    this.setState({ loading: true });
    const data = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //reset state to false after you get the data
    //push the data in the users empty array
    this.setState({ users: data.data.items, loading: false });
  };
  //get single github user
  getUser = async username => {
    this.setState({ loading: true });
    const data = await axios.get(
      `https://api.github.com/users/${username}?client_id${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //reset state to false after you get the data
    //push the data in the users empty array
    this.setState({ user: data.data, loading: false });
  };
  //get repo of single github user
  getRepo = async username => {
    this.setState({ loading: true });
    const data = await axios.get(
      //sort repos by 5 in ascending order
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //reset state to false after you get the data
    //push the data in the users empty array
    this.setState({ repos: data.data, loading: false });
  };
  //clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };
  //set alert when input is empty
  setAlert = (msg, type) => {
    //pass the 2 parameters as objects in the alert state
    this.setState({ alert: { msg, type } });
    //remove alert after 3 seconds
    setTimeout(() => this.setState({ alert: null }), 3000);
  };
  render() {
    //destructure
    const { users, user, loading, repos } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              {/*HOME ROUTE*/}
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    {/*show clear if there are users */}
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    {/*pass the users components through props */}
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              {/*ABOUT ROUTE*/}
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                    getRepo={this.getRepo}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
