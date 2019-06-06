import React from "react";
import PropTypes from "prop-types";
import RepoItem from "./RepoItem";

const Repos = ({ repos }) => {
  //you need because it is a list
  return repos.map(repo => <RepoItem repo={repo} key={repo.id} />);
};
//typecheck
Repos.propTypes = {
  repos: PropTypes.array.isRequired
};

export default Repos;
