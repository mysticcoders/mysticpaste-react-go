import React from 'react';

import { Container } from 'semantic-ui-react';

import HeaderContainer from '../containers/HeaderContainer';
import AdminContainer from '../containers/AdminContainer';
import FooterContainer from '../containers/FooterContainer';

const AdminPage = () => {
    return (
        <Container fluid>
            <HeaderContainer />

            <Container>
                <AdminContainer />
            </Container>
            <FooterContainer />
        </Container>
    );
};

export default AdminPage;
