import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Message, Header} from 'semantic-ui-react'

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
        // TODO should check to make sure there's a pasteId entered to delete
        this.props.actions.deletePaste(this.state.deletePasteId);
    }

    render() {

        return (
            <div>
                <Header size="huge">About Mystic Paste</Header>

                <Message>
                    <p>
                    The pastebin is a labor of love that started with the team at Mystic writing a tutorial series
                    named <a href="http://mysticcoders.com/blog/5-days-of-wicket">5 Days of Wicket</a>.
                    </p>
                    <p>
                        The old version built using the wonderful <a href="http://wicket.apache.org">Apache Wicket</a> platform
                        is <a href="https://github.com/kinabalu/mysticpaste">still available on GitHub</a>.
                    </p>
                    <p>
                        So by all means, paste your code, be merry, and be good to one another. If you post anything deemed spam
                        don't be surprised to find the paste gone at some point.
                    </p>
                </Message>

                <Header size="huge">Version</Header>

                <Message
                    header='Version'>
                    {this.props.app_version}
                </Message>
            </div>
                /*
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
                 */
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(pasteActions, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(AboutContainer);
