import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as pasteActions from '../actions/pasteActions';

import { FormGroup, FormControl } from 'react-bootstrap';
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
    if(nextProps.paste && nextProps.saved) {
      this.context.router.push('/' + nextProps.paste.id);
    }
  }

  createPaste() {
    this.props.actions.savePaste(this.state.code, this.state.language); //.then(() => {
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <FormGroup controlId="code">
          <FormControl onChange={this.handleChange} bsSize="large" rows="20" componentClass="textarea" placeholder="Code here..." />
        </FormGroup>

        <ActionBar
          handleChange={this.handleChange}
          createPaste={this.createPaste}
          language={this.state.language}
          code={this.state.code} />

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
  (state) => { return { paste: state.pastes.pastes.paste, saved: state.pastes.pastes.saved }; },
  (dispatch) => { return { actions: bindActionCreators(pasteActions, dispatch) }; }
)(NewPasteContainer);
