import React from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import AboutContainer from '../containers/AboutContainer';
import FooterContainer from '../containers/FooterContainer';

const AboutPage = () => {
  return (
    <div className="container">
      <HeaderContainer />

      <AboutContainer app_version="2.0" />

      <FooterContainer />
    </div>
  );
};

export default AboutPage;
