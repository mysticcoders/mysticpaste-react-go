import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actions as pasteActions} from '../ducks/pastes';

import {TextArea} from 'semantic-ui-react';
import ActionBar from '../components/ActionBar';

class NewPasteContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.createPaste = this.createPaste.bind(this);
        this.state = {
            code: '',
            language: 'python',
            hasCode: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        // if(this.state.code !== nextState.code) return true;

        if(this.state.hasCode !== nextState.hasCode) return true;
        if(this.props.saved !== nextProps.saved) return true;

        return false;
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
        const hasCode = (data.id === 'code' || data.id === 'language') && data.value !== '';

        this.setState({
            [data.id]: data.value,
            hasCode,
        });
    };

    render() {
        return (
            <div>
                <TextArea id="code"
                          onChange={this.handleChange}
                          placeholder='Code here...'
                          style={{ width: '100%' }}
                          rows="20"/>

                <ActionBar
                    handleChange={this.handleChange}
                    createPaste={this.createPaste}
                    language={this.state.language}
                    code={this.state.code}
                    hasCode={this.state.hasCode}
                />

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
