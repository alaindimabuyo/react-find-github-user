import React, { useState, useContext } from "react";
import GithubContext from "../../context/Github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";
const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
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
      githubContext.searchUsers(text);
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

      {githubContext.users.length > 0 && (
        //show clear button if there are users
        <button className='btn btn-li ght btn-block' onClick={githubContext.clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
