import React, {PropTypes} from 'react';
import moment from 'moment';
import './PasteEntry.css';

import Highlight from 'react-highlight';
import { Container, Label } from 'semantic-ui-react';

const PasteEntry = ({paste, lines_to_show, onViewPaste}) => {

    function shortenedPaste(code, length) {
        if (!code) return '';

        let splitCode = code.split("\n");
        splitCode.length = length > splitCode.length ? splitCode.length : length;
        return splitCode.join('\n');
    }

    let code = lines_to_show > 0 ? shortenedPaste(paste.content, lines_to_show) : paste.content;

    let language = "python";
    if (paste.language) {
        language = paste.language;
    }
    let natural_created = moment(paste.created_at).fromNow();

    const metaColor = paste.abuse ? "red" : "grey";

    return (
        <Container>
            <div key={paste.id} className="pasteEntry" onClick={() => {
                onViewPaste(paste.id);
            }}>
                <Label color={metaColor}>
                    {natural_created}
                    { paste.abuse &&
                        <Label.Detail>
                            Spam
                        </Label.Detail>
                    }
                </Label>
                <Highlight className={language}>
                    {code}
                </Highlight>
            </div>
        </Container>
    );
};

PasteEntry.propTypes = {
    onViewPaste: PropTypes.func,
    paste: PropTypes.object.isRequired,
    lines_to_show: PropTypes.number.isRequired
};


export default PasteEntry;
