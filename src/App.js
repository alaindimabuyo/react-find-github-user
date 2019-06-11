import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import About from "./components/Pages/About";
import Home from "./components/Pages/Home";
import User from "./components/Users/User";
import Alert from "./components/layout/Alert";
import Notfound from "./components/Pages/Notfound";
import "./App.css";
import GithubState from "./context/Github/GithubState";
import AlertState from "./context/alert/AlertState";

const App = () => {
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

  //clear users from state

  //destructure

  return (
    //wrap with githubstate provider
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                {/*HOME ROUTE*/}
                <Route exact path='/' component={Home} />
                {/*ABOUT ROUTE*/}
                <Route exact path='/about' component={About} />
                {/*User*/}
                <Route exact path='/user/:login' component={User} />
                <Route component={Notfound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
