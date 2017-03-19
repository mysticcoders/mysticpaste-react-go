import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { ListGroup, ListGroupItem, Form, FormGroup, FormControl, Button } from 'react-bootstrap';

import * as pasteActions from '../actions/pasteActions';

class AboutContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.deletePaste = this.deletePaste.bind(this);
  }

  componentDidMount() {
    this.setState({
      deletePasteId: null
    });
  }

  onViewPaste(pasteId) {
    this.context.router.push('/view/' + pasteId);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  deletePaste() {
    console.log(this);
    console.log(this.state);
    // TODO should check to make sure there's a psateId entered to delete
    this.props.actions.deletePaste(this.state.deletePasteId);
  }

  render() {

    return (
      <ListGroup>
        <ListGroupItem>
          <h4>Version</h4>
          <small>{this.props.app_version}</small>
        </ListGroupItem>
          {/*
        <ListGroupItem>
          <p className="lead">
            If you feel a paste needs to be deleted and the cookie is gone, enter it below and it will be
            expunged.
          </p>
          <Form inline>
            <FormGroup controlId="deletePasteId">
              <FormControl onChange={this.handleChange} type="text" placeholder="ID of paste to delete" />
              {'   '}
              <Button bsStyle="primary" onClick={this.deletePaste}>Delete Paste</Button>
            </FormGroup>
          </Form>
        </ListGroupItem>
           */}
      </ListGroup>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(pasteActions, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(AboutContainer);
