import React, { PropTypes } from 'react';

import * as langs from '../constants/languages';
import { FormGroup, FormControl } from 'react-bootstrap';

const LanguageSelect = ({handleChange, language}) => {

  return (
    <FormGroup controlId="language">
      <FormControl componentClass="select" value={language} onChange={handleChange} placeholder="select">
        <option value="select" />
        {langs.LANGUAGES.map(language =>
          <option key={language.alias} value={language.alias}>{language.name}</option>
        )}
      </FormControl>
    </FormGroup>
  );
};

LanguageSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  language: PropTypes.string
};


export default LanguageSelect;
