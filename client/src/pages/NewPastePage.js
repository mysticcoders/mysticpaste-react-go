import React from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import NewPasteContainer from '../containers/NewPasteContainer';
import FooterContainer from '../containers/FooterContainer';

const NewPastePage = () => {

  return (
    <div>
      <HeaderContainer />

      <NewPasteContainer />

      <FooterContainer />
    </div>
  );
};

export default NewPastePage;
