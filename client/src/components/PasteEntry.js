import React, { PropTypes } from 'react';
import moment from 'moment';
import './PasteEntry.scss';

import Highlight from 'react-highlight';

const PasteEntry = ({paste, lines_to_show, onViewPaste}) => {

  function shortenedPaste(code, length) {
    if(!code) return '';

    let splitCode = code.split("\n");
    splitCode.length = length > splitCode.length ? splitCode.length : length;
    return splitCode.join('\n');
  }

  let code = lines_to_show > 0 ? shortenedPaste(paste.content, lines_to_show) : paste.content;

  let language = "python";
  if(paste.language) {
    language = paste.language;
  }
  let natural_created = moment(paste.created_at).fromNow();

  return (
    <div key={paste.id} className="pasteEntry" onClick={()=>{onViewPaste(paste.id);}}>
      <p className="lead" style={{marginTop: '10px', marginBottom: '0px'}}>{natural_created}</p>
      <Highlight className={language}>
        {code}
      </Highlight>
    </div>
  );
};

PasteEntry.propTypes = {
  onViewPaste: PropTypes.func,
  paste: PropTypes.object.isRequired,
  lines_to_show: PropTypes.number.isRequired
};


export default PasteEntry;
