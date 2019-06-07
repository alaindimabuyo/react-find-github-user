import React from "react";
import PropTypes from "prop-types";

const RepoItem = ({ repo }) => {
  return (
    <div className='card'>
      <h3>
        <a href={repo.html_url} style={{ color: "#28a745" }}>
          {repo.name}
        </a>
      </h3>
    </div>
  );
};
//typecheck
RepoItem.propTypes = {
  repo: PropTypes.object.isRequired
};

export default RepoItem;
