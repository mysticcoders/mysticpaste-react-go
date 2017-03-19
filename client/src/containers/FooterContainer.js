import React from 'react';

import { Link } from 'react-router';
import moment from 'moment';

class FooterContainer extends React.Component {

  // constructor(props, context) {
  //   super(props, context);
  // }

  render() {

    let currentYear = moment().format('Y');

    return (
        <footer className="footer">
            <div className="container">
              <span className="text-muted">
              Copyright &copy; 2000 - {currentYear}
              &nbsp;&mdash;&nbsp;
              <a href="http://mysticcoders.com">Mystic Coders, LLC</a>
              &nbsp;&mdash;&nbsp;
              <a href="http://mysticcoders.com/blog">Blog</a>
              &nbsp;&middot;&nbsp;
              <a href="https://github.com/kinabalu/mysticpaste">Source</a>
              &nbsp;&middot;&nbsp;
              <Link to="/legal">Legal</Link>
              </span>
            </div>
        </footer>
    );
  }
}


export default FooterContainer;
