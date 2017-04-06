import React, { PropTypes } from 'react';
import { Button, Container } from 'semantic-ui-react';

import LanguageSelect from './LanguageSelect';

const ActionBar = ({handleChange, createPaste, language, code}) => {

  return (
    <Container fluid>
      <Button primary disabled={!code} onClick={createPaste}>Create Paste</Button>

      <div className="pull-right">
        <LanguageSelect handleChange={handleChange} language={language} />
      </div>
    </Container>
  );
};

ActionBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  createPaste: PropTypes.func.isRequired,
  language: PropTypes.string,
  code: PropTypes.string.isRequired
};


export default ActionBar;
