import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as pasteActions} from '../ducks/pastes';
import {actions as authActions} from '../ducks/auths';

import PasteEntry from '../components/PasteEntry';

import {Container, Header, Button, Confirm, Message} from 'semantic-ui-react';

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
        this.props.actions.changePasteAbuse(this.props.pasteId, !this.props.paste.paste.abuse);
        this.setState({
            open: false,
        });
        this.context.router.push('/history');           // when done, lets just go back to history because ... that's enough
    }

    render() {
        const {admin, pasteAbuseChanged} = this.props;

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

        console.log(this.props.paste);

        let paste = this.props.paste.paste;

        const spamButtonText = paste.abuse ? "Not spam" : "Mark as Spam";
        const spamButtonColor = paste.abuse ? "orange" : "red";
        return (
            <Container>
                { admin &&
                    <span>
                        { pasteAbuseChanged &&
                          <Message success>
                            <Message.Header>Status of paste successfully changed</Message.Header>
                            <p>You've successfully modified the paste.</p>
                          </Message>
                        }
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
    return {actions: bindActionCreators({...pasteActions, ...authActions}, dispatch)};
};

function mapStateToProps(state) {
    return {
        paste: state.pastes.pastes,
        admin: state.auth.admin,
        pasteAbuseChanged: state.pastes.pasteAbuseChanged
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPasteContainer);
