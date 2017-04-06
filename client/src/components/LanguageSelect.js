import React, { PropTypes } from 'react';

import * as langs from '../constants/languages';
import { Dropdown } from 'semantic-ui-react';

const LanguageSelect = ({handleChange, language}) => {

  return (
    <Dropdown id="language" placeholder='Select your language' selection search onChange={handleChange} value={language} options={langs.LANGUAGES} />
  );
};

LanguageSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  language: PropTypes.string
};


export default LanguageSelect;