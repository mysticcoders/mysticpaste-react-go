import React from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import HistoryContainer from '../containers/HistoryContainer';
// import FooterContainer from '../containers/FooterContainer';

import { Container } from 'semantic-ui-react';

const HistoryPage = () => {

  return (
    <div>
      <HeaderContainer />

        <Container>
            <HistoryContainer />
        </Container>
    </div>
  );
};

export default HistoryPage;
