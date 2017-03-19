import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as pasteActions from '../actions/pasteActions';

import PasteEntry from '../components/PasteEntry';

class ViewPasteContainer extends React.Component {
  // constructor(props, context) {
  //   super(props, context);
  // }

  componentWillMount() {
    this.props.loadPaste(this.props.pasteId);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  onViewPaste(pasteId) {
  }

  render() {
    if(this.props.paste.error) {
      return (
        <div className="container-fluid">
          <h1>Paste not found</h1>
        </div>
      );
    }

    if(!this.props.paste.paste) {
      return (
        <h1>Loading...</h1>
      );
    }

    let paste = this.props.paste.paste;

    // let language = paste.language ? paste.language : "bash";

    return (
      <div className="container-fluid">
        <PasteEntry paste={paste} lines_to_show={0} onViewPaste={this.onViewPaste.bind(this)}/>
      </div>
    );
  }
}

ViewPasteContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

ViewPasteContainer.propTypes = {
  loadPaste: PropTypes.func.isRequired,
  pasteId: PropTypes.string.isRequired,
  paste: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPaste: (pasteId) => {
      dispatch(pasteActions.loadPaste(pasteId));
    }
  };
};

function mapStateToProps(state) {
  return {
    paste: state.pastes.pastes,
    isAuthenticated: true
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPasteContainer);
