import React from 'react';

import { Container } from 'semantic-ui-react';

import HeaderContainer from '../containers/HeaderContainer';
import AboutContainer from '../containers/AboutContainer';
import FooterContainer from '../containers/FooterContainer';

const AboutPage = () => {
  return (
    <div className="container">
      <HeaderContainer />

        <Container>
            <AboutContainer app_version="2.0" />
        </Container>
      <FooterContainer />
    </div>
  );
};

export default AboutPage;
