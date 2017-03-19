import React, { PropTypes } from 'react';
import Header from '../components/Header';

class HeaderContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.transitionToAboutPage = this.transitionToAboutPage.bind(this);
    this.transitionToHistoryPage = this.transitionToHistoryPage.bind(this);
    this.transitionToNewPastePage = this.transitionToNewPastePage.bind(this);
  }

  transitionToAboutPage() {
    this.context.router.push('/about');
  }

  transitionToHistoryPage() {
    this.context.router.push('/history');
  }

  transitionToNewPastePage() {
    this.context.router.push('/new');
  }

  render() {
    return (
      <Header
        transitionToAboutPage={this.transitionToAboutPage}
        transitionToHistoryPage={this.transitionToHistoryPage}
        transitionToNewPastePage={this.transitionToNewPastePage}
        />
    );
  }
}


HeaderContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

export default HeaderContainer;
