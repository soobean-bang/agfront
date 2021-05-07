import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';

import Collapse from "@material-ui/core/Collapse";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1),
    },
}));

const Folder = (props) => {
    const classes = useStyles();

    const { label, ...CollapseProps } = props;

    const [open, setOpen] = React.useState(false);

    const onClick = () => {
        setOpen(!open);
    }

    return (
        <div className={classes.root}>
            <Button
                fullWidth
                onClick={onClick}
                variant='contained'
                endIcon={open ? <ExpandLess /> : <ExpandMore />}
            >
                {label}
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit {...CollapseProps} />
        </div>
    );
};

export default Folder;