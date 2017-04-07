import React, {PropTypes} from "react";

import HeaderContainer from "../containers/HeaderContainer";
import ViewPasteContainer from "../containers/ViewPasteContainer";
import FooterContainer from "../containers/FooterContainer";

const ViewPastePage = (props) => {

    let pasteId = props.params.id;

    if (!pasteId) {
        const possiblePasteId = props.location.pathname.substr(1);
        pasteId = possiblePasteId;
    }
    return (
        <div className="pusher">
            <HeaderContainer />

            <ViewPasteContainer pasteId={pasteId}/>

            <div id="content" className="ui vertical stripe segment">
                <div className="ui middle aligned stackable grid container">
                <FooterContainer />
                </div>
            </div>
        </div>
    );
};


ViewPastePage.propTypes = {
    params: PropTypes.object,
    location: PropTypes.object,
};

export default ViewPastePage;
