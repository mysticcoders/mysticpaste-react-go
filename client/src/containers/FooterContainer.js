import React from 'react';

import {Link} from 'react-router';
import {Container} from 'semantic-ui-react';
import moment from 'moment';

class FooterContainer extends React.Component {

    render() {

        let currentYear = moment().format('Y');

        return (
            <footer className="footer">
                <Container>
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
                </Container>
            </footer>
        );
    }
}


export default FooterContainer;
