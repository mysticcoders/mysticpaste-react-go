import React, {PropTypes} from 'react';

import AppContainer from '../containers/AppContainer';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer>
       {this.props.children}
      </AppContainer>
    );
  }

}

AppContainer.propTypes = {
  children: PropTypes.node,
};
