import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as pasteActions from '../actions/pasteActions';

import {TextArea} from 'semantic-ui-react';
import ActionBar from '../components/ActionBar';

class NewPasteContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.createPaste = this.createPaste.bind(this);
        this.state = {
            code: '',
            language: 'python'
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.paste && nextProps.saved) {
            this.context.router.push('/' + nextProps.paste.id);
        }
    }

    createPaste() {
        this.props.actions.savePaste(this.state.code, this.state.language); //.then(() => {
    }

    handleChange = (event, data) => {

        this.setState({
            [data.id]: data.value
        });
    };

    render() {
        return (
            <div>
                <TextArea id="code" onChange={this.handleChange} placeholder='Code here...' style={{ width: '100%' }} rows="20"/>

                <ActionBar
                    handleChange={this.handleChange}
                    createPaste={this.createPaste}
                    language={this.state.language}
                    code={this.state.code}/>

            </div>
        );
    }
}

NewPasteContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

NewPasteContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    paste: PropTypes.object
};

export default connect(
    (state) => {
        return {paste: state.pastes.pastes.paste, saved: state.pastes.pastes.saved};
    },
    (dispatch) => {
        return {actions: bindActionCreators(pasteActions, dispatch)};
    }
)(NewPasteContainer);
