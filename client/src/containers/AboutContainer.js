import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Message, Header} from 'semantic-ui-react'

import {actions as pasteActions} from '../ducks/pastes';

class AboutContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.deletePaste = this.deletePaste.bind(this);
    }

    shouldComponentUpdate() {
        return false;
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
                        The new version is using <a href="https://golang.org/">Golang</a> for the API, and&nbsp;
                        <a href="https://facebook.github.io/react/">React</a> and <a href="http://redux.js.org/">Redux</a> on the frontend. You
                        can <a href="https://github.com/kinabalu/mysticpaste-react-go">view the source code</a> and we are always accepting pull requests!
                    </p>
                    <p>
                        So by all means, paste your code, be merry, and be good to one another. If you post anything deemed spam
                        don't be surprised to find the paste gone at some point.
                    </p>
                </Message>

                <Header size="huge">Version</Header>

                <Message>
                    {this.props.app_version}
                </Message>


                {/*<Header size="huge">Request Deletion</Header>*/}

                {/*<Message>*/}
                    {/*If you feel a paste needs to be deleted and the cookie is gone, enter it below and it will be*/}
                    {/*expunged.*/}
                {/*</Message>*/}
            </div>
                /*
                 <ListGroupItem>
                 <p className="lead">

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
