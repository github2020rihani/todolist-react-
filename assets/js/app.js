import React from 'react';
import ReactDOM from 'react-dom';
import DefaultThemeProvider from "./components/themes/DefaultThemeProvider";
import Router from "./components/Router";
import {
    createMuiTheme,
    CssBaseline,
    MuiThemeProvider,
    responsiveFontSizes,
} from '@material-ui/core';
import {indigo, deepPurple, grey} from '@material-ui/core/colors';

import UserContextProvider from './contexts/UserContext';

function App() {
    return (
        <UserContextProvider> <Router/> </UserContextProvider>
    );

}
class App extends React.Component {
    render() {
        return (
            <Router/>
        )
    }
}


ReactDOM.render(
    <DefaultThemeProvider>
        <App/>
    </DefaultThemeProvider>, document.getElementById('root'));
