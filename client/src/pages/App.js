import React, {PropTypes} from 'react';

class App extends React.PureComponent {

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("App.nextProps", nextProps);
    //     console.log("App.this.props", this.props);
    //
    //
    //     console.log("nextProps.location.query", nextProps.location.query);
    //     console.log("this.props.location.query", this.props.location.query);
    //
    //
    //     if(!Object.is(nextProps.location.query, this.props.location.query)) return true;
    //     if(!Object.is(nextProps.location.$searchBase, this.props.location.$searchBase)) return true;
    //     if(!Object.is(nextProps.params, this.props.params)) return true;
    //     if(!Object.is(nextProps.routeParams, this.props.routeParams)) return true;
    //
    //     // if(nextProps.location.query !== this.props.location.query) return true;
    //     // if(nextProps.location.$searchBase !== this.props.location.$searchBase) return true;
    //     // if(nextProps.params !== this.props.params) return true;
    //     // if(nextProps.routeParams !== this.props.routeParams) return true;
    //
    //     return false;
    // }

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