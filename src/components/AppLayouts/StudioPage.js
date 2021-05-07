import React from 'react';

import { inject, observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import MovieCreater from 'components/Pages/MovieCreater';
import MovieManager from 'components/Pages/MovieManager';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={0}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        flexShrink: 0,
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    tabPanels: {
        flexGrow: 1,
    },
}));

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const StudioPage = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const { applyFilter } = props;

    const handleChange = (event, newValue) => {
        switch (newValue) {
            case 1:
                applyFilter();
                break;
            default:
        }
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs"
                className={classes.tabs}
            >
                <Tab label="Movie Creater" {...a11yProps(0)} />
                <Tab label="Movie Maneger" {...a11yProps(1)} />
            </Tabs>
            <div className={classes.tabPanels}>
                <TabPanel value={value} index={0}>
                    <MovieCreater />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MovieManager />
                </TabPanel>
            </div>
        </div>
    );
}

export default inject(({ manager }) => ({
    applyFilter: manager.applyFilter,
}))(observer(StudioPage));