import React from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import NewPasteContainer from '../containers/NewPasteContainer';
import FooterContainer from '../containers/FooterContainer';

import { Container } from 'semantic-ui-react';

const NewPastePage = () => {

  return (
    <div>
      <HeaderContainer />

        <Container fluid style={{ padding: '10px'}}>
            <NewPasteContainer />
        </Container>

      <FooterContainer />
    </div>
  );
};

export default NewPastePage;
