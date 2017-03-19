import React, {PropTypes} from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import ViewPasteContainer from '../containers/ViewPasteContainer';
import FooterContainer from '../containers/FooterContainer';

const ViewPastePage = (props) => {

  let pasteId = props.params.id;

  if(!pasteId) {
    const possiblePasteId = props.location.pathname.substr(1);
    pasteId = possiblePasteId;
  }
  return (
    <div>
      <HeaderContainer />

      <ViewPasteContainer pasteId={pasteId} />

      <FooterContainer />
    </div>
  );
};


ViewPastePage.propTypes = {
  params: PropTypes.object,
  location: PropTypes.object,
};

export default ViewPastePage;
