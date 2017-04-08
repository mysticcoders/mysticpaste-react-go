import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
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
        const { admin } = this.props;

        return (
            <Header
                transitionToAboutPage={this.transitionToAboutPage}
                transitionToHistoryPage={this.transitionToHistoryPage}
                transitionToNewPastePage={this.transitionToNewPastePage}
                isAdmin={admin}
            />
        );
    }
}


HeaderContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        admin: state.auth.admin
    };
}

export default connect(mapStateToProps)(HeaderContainer);