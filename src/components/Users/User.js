import React, { Fragment, Component } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import Repos from "../repos/Repos";
import { Link } from "react-router-dom";
class User extends Component {
  //pull the username from the getuser method in app
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getRepo(this.props.match.params.login);
  }
  //typecheck
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getRepo: PropTypes.func.isRequired
  };
  render() {
    //pull the data we want from the props user
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      company,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.user;
    //if loading is true show spinner
    if (this.props.loading) return <Spinner />;
    return (
      <Fragment>
        <Link to={"/"} className='btn btn-success'>
          Back to Home
        </Link>
        {/*conditions if hireable is true or false*/}
        Hireable{" "}
        {hireable ? (
          <i className='fas fa-check text-success' />
        ) : (
          <i className='fas fa-times text-danger' />
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              className='round-img'
              alt=''
              style={{ width: "150px" }}
            />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio:</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-dark my-1'>
              Visit Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username:</strong> {login}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company:</strong> {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website:</strong> {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers:{followers}</div>
          <div className='badge badge-success'>Following:{following}</div>
          <div className='badge badge-light'>Public-Repos:{public_repos}</div>
          <div className='badge badge-dark'>Public-Gist:{public_gists}</div>
        </div>
        <Repos repos={this.props.repos} />
      </Fragment>
    );
  }
}

export default User;
