import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as pasteActions from '../actions/pasteActions';

import PasteEntry from '../components/PasteEntry';

import {Container, Header, Button, Confirm} from 'semantic-ui-react';

class ViewPasteContainer extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.handleChangePasteAbuse = this.handleChangePasteAbuse.bind(this);
      this.state = {
          open: false
      };
    }

    componentWillMount() {
        this.props.actions.loadPaste(this.props.pasteId);
    }

    onViewPaste(pasteId) {
    }

    show = () => this.setState({ open: true });
    handleCancel = () => this.setState({ open: false });

    handleChangePasteAbuse() {
        this.props.actions.changePasteAbuse(this.props.pasteId, !this.props.paste.abuse);
    }

    render() {
        const {admin} = this.props;

        if (this.props.paste.error) {
            return (
                <Container>
                    <Header size="huge">Paste not found</Header>
                </Container>
            );
        }

        if (!this.props.paste.paste) {
            return (
                <Header size="large">Loading...</Header>
            );
        }

        let paste = this.props.paste.paste;

        const spamButtonText = paste.abuse ? "Not spam" : "Mark as Spam";
        const spamButtonColor = paste.abuse ? "orange" : "red";
        return (
            <Container>
                { admin &&
                    <span>
                    <Button floated='right' color={spamButtonColor} onClick={this.show}>{spamButtonText}</Button>
                    <Confirm
                        open={this.state.open}
                        content="Are you sure you want to mark this paste as spam?"
                        onCancel={this.handleCancel}
                        onConfirm={this.handleChangePasteAbuse}
                    />
                    </span>
                }
                <PasteEntry paste={paste} lines_to_show={0} onViewPaste={this.onViewPaste.bind(this)}/>
            </Container>
        );
    }
}

ViewPasteContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

ViewPasteContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    pasteId: PropTypes.string.isRequired,
    paste: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {actions: bindActionCreators(pasteActions, dispatch)};
};

function mapStateToProps(state) {
    return {
        paste: state.pastes.pastes,
        admin: state.auth.admin
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPasteContainer);
