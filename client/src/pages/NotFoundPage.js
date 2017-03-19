import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = (props) => {
  return (
    <div>
      <h4>
        404 Page Not Found
        {props.location.pathname}
      </h4>
      <Link to="/"> Go back to homepage </Link>
    </div>
  );
};

export default NotFoundPage;
