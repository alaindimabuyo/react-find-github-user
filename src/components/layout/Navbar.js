import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// pass the state as parameters for destructuring
const Navbar = ({ icon, title }) => {
  return (
    <nav className='navbar bg-success'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      {/*Use Link to the state so it wont change or refresh */}
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

//variables for the navbar
Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github"
};

// check props if string
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
