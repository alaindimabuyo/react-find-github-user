import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

//name of component
const Users = ({ users, loading }) => {
  //destructure props and put them in the params
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={styledBoxes}>
        {/*loop USERS with the useritem*/}
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};
// grid system for the boxes
const styledBoxes = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};
//check props
Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};
export default Users;
