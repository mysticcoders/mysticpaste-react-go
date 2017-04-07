import React, {PropTypes} from 'react';

import {Menu} from 'semantic-ui-react'

const Header = ({transitionToNewPastePage, transitionToHistoryPage, transitionToAboutPage}) => {

    return (
        <Menu fixed="top" inverted>
            <Menu.Item
                name='new_paste'
                onClick={transitionToNewPastePage}>
                <i className="fa fa-plus" aria-hidden="true"/>&nbsp;New Paste
            </Menu.Item>
            <Menu.Item
                name='my_paste'
                onClick={transitionToHistoryPage}>
                <i className="fa fa-history" aria-hidden="true"/>&nbsp;My Paste
            </Menu.Item>
            <Menu.Item
                name='about'
                onClick={transitionToAboutPage}>
                <i className="fa fa-question" aria-hidden="true"/>&nbsp;About
            </Menu.Item>
        </Menu>
    );
};

Header.propTypes = {
    transitionToAboutPage: PropTypes.func.isRequired,
    transitionToNewPastePage: PropTypes.func.isRequired,
    transitionToHistoryPage: PropTypes.func.isRequired
};

export default Header;