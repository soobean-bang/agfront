import React from 'react';

import './App.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { koKR } from '@material-ui/core/locale';

import StudioAppBar from 'components/AppLayouts/StudioAppBar';
import StudioPage from 'components/AppLayouts/StudioPage';

import { makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({}, koKR);

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
}));

const App = (props) => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <StudioAppBar />
                <StudioPage />
            </div>
        </ThemeProvider>
    );
}

export default App;
