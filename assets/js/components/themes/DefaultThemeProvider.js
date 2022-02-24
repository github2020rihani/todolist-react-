import React from 'react'
import {createMuiTheme, MuiThemeProvider, responsiveFontSizes} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme } from '@material-ui/core/styles';
import {green, red, amber} from "@material-ui/core/colors";
const theme = createTheme({
    palette : {
        type : 'dark',
        secondary: {
            main: red['800']
        },
        primary: green
    }

});

const respensiveTheme = responsiveFontSizes(theme);

const DefaultThemeProvider = (props) => {
    return (
        <MuiThemeProvider theme={respensiveTheme}>
            <CssBaseline/>
            {props.children}
        </MuiThemeProvider>
    );
}


export default DefaultThemeProvider;