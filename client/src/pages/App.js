import React, {PropTypes} from 'react';

class App extends React.PureComponent {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

}

App.propTypes = {
    children: PropTypes.node,
};

export default App;