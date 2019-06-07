import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
  //attach state in the input
  //pull out text then create a method setText, the put default value
  const [text, setText] = useState("");
  //change the state for whatever input you have submitted in the form
  const onChange = e => setText(e.target.value);
  //submit and take the text submitted
  const onSubmit = e => {
    e.preventDefault();
    //set alert if input is empty
    if (text === "") {
      setAlert("Please enter Something", "light");
    } else {
      //pass the value in the main app component through props
      searchUsers(text);
      //clear the form
      setText("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search for Users'
          value={text}
          onChange={onChange}
        />
        <button type='submit' value='Search' className='btn btn-block btn-dark'>
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
};

//typecheck
Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default Search;
