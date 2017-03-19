import React, { PropTypes } from 'react';

import NotificationSystem from 'react-notification-system';

class App extends React.Component {

  // constructor(props, context) {
  //   super(props, context);
  // }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  addNotification = () => {
    // event.preventDefault();
    this._notificationSystem.addNotification({
      message: 'Notification message',
      level: 'success'
    });
  };

  render() {
    return (
      <div>
        <NotificationSystem ref="notificationSystem" />

        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
