import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  //attach state in the input
  state = {
    text: ""
  };
  //change the state for whatever input you have submitted in the form
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  //submit and take the text submitted
  onSubmit = e => {
    e.preventDefault();
    //set alert if input is empty
    if (this.state.text === "") {
      this.props.setAlert("Please enter Something", "light");
    } else {
      //pass the value in the main app component through props
      this.props.searchUsers(this.state.text);
      //clear the form
      this.setState({ text: "" });
    }
  };
  //check for props
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  };
  render() {
    const { clearUsers, showClear } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search for Users'
            value={this.state.text}
            onChange={this.onChange}
          />
          <button
            type='submit'
            value='Search'
            className='btn btn-block btn-dark'
          >
            Search
          </button>
        </form>

        {showClear && (
          //show clear button if there are users
          <button className='btn btn-light btn-block' onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
