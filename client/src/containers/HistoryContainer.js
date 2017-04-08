import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as pasteActions from '../actions/pasteActions';

import {Container, Header, Radio, Divider, Button} from 'semantic-ui-react';

import PasteEntry from '../components/PasteEntry';

class HistoryContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onViewPaste = this.onViewPaste.bind(this);
        this.handleShowAbuse = this.handleShowAbuse.bind(this);
    }

    componentWillMount() {
        this.props.actions.loadPastes(this.props.showSpam, 0);
    }

    onViewPaste(pasteId) {
        this.context.router.push('/' + pasteId);
    }

    loadMorePastes() {
        this.props.actions.loadMorePastes(this.props.showSpam, this.props.next);
    }

    handleShowAbuse() {
        if(!this.props.showSpam) {
            this.props.actions.showSpamPastes();
        } else {
            this.props.actions.hideSpamPastes();
        }
        this.props.actions.loadPastes(!this.props.showSpam, 0);
    }

    render() {
        const { admin, showSpam } = this.props;

        if (!this.props.pastes) {
            return (
                <Header size="large">Loading...</Header>
            );
        }
        let pastes = this.props.pastes;

        if (pastes.length === 0) {
            return (
                <Container fluid>
                    <Header size="large">
                        No pastes found
                    </Header>
                </Container>
            );
        }

        return (
            <Container fluid>
                { admin &&
                    <Radio label="Show Spam Pastes" toggle onClick={this.handleShowAbuse} checked={showSpam} />
                }
                {pastes.map(paste =>
                    <PasteEntry key={paste.id} paste={paste} lines_to_show={5} onViewPaste={this.onViewPaste}/>
                )}
                <Divider hidden />
                <Button floated="right" onClick={()=>{this.loadMorePastes();}}>Load More</Button>
                <Divider hidden clearing={true} />
            </Container>
        );
    }
}

HistoryContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

HistoryContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    pastes: PropTypes.array.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {actions: bindActionCreators(pasteActions, dispatch)};
};

function mapStateToProps(state) {
    let pastes = [];

    if (state.pastes.pasteList.pastes) {
        pastes = state.pastes.pasteList.pastes;
    }

    return {
        pastes: pastes,
        admin: state.auth.admin,
        next: state.pastes.pasteList.next,
        showSpam: state.pastes.showSpam,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);
