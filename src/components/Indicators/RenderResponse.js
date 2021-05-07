import React from 'react';

import { inject, observer } from 'mobx-react';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import InfoIcon from '@material-ui/icons/Info';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

function CustomizedSnackbars(props) {
    const classes = useStyles();

    const {
        open,
        request_state,
        handleClose,
        message_already_rendered,
        message_request_success,
    } = props;

    const _handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        handleClose();
    };

    let icon;
    let message;

    console.log(request_state);

    switch (request_state) {
        case "already_rendered":
            icon = <InfoIcon />;
            message = message_already_rendered;
            break;
        case "success":
            icon = <CheckCircleOutlineIcon />;
            message = message_request_success;
            break;
        default:
            return null;
    }

    return (
        <div className={classes.root}>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={_handleClose}
            >
                {icon}
                {message}
                <IconButton size="small" aria-label="close" color="inherit" onClick={_handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Snackbar>
        </div>
    );
}

export default inject(({ app_store, creater }) => ({
    open: creater.show_request_result,
    handleClose: creater.closeRequestResult,
    request_state: creater.request_state,
    message_already_rendered: app_store.strings.message_already_rendered,
    message_request_success: app_store.strings.message_request_success,
}))(observer(CustomizedSnackbars));