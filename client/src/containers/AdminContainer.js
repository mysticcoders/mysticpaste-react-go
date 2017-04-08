import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Header, Container, Form, Button} from 'semantic-ui-react';

import * as pasteActions from '../actions/pasteActions';

class AdminContainer extends React.Component {


    handleChange = (event, data) => {
        this.setState({
            [data.id]: data.value
        });
    };

    handleLogout = (event) => {
        event.preventDefault();

        this.props.actions.logoutAdmin();
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.actions.checkAdmin(this.state.admin_key);
    };

    render() {
        const { admin } = this.props;

        return (
            <Container fluid>
                <Form>
                    <Header size="huge">Admin</Header>
                    { !admin &&
                        <div>
                        <Form.Input id="admin_key" label="Admin Key" type="text" onChange={this.handleChange} placeholder='Admin Key' />
                        <Button onClick={this.handleSubmit}>Submit</Button>
                        </div>
                    }
                    { admin &&
                        <Button onClick={this.handleLogout}>Logout</Button>
                    }
                </Form>
            </Container>
        );
    }
}
;

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(pasteActions, dispatch)
    };
};


function mapStateToProps(state) {
    return {
        admin: state.auth.admin
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);