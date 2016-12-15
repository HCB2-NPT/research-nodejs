import React from 'react';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MainContainer from './MainContainer.jsx';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    render() {
        return (
            <div>
                <AppBar className="app-bar" title="Music Store" />
                <MainContainer />
            </div>
        )
    }
}

Main.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default Main