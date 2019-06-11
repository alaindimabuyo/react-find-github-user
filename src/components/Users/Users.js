import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";

import GithubContext from "../../context/Github/GithubContext";

//name of component
const Users = () => {
  //intialize github context
  const githubContext = useContext(GithubContext);
  //destructure
  const { loading, users } = githubContext;

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

export default Users;
