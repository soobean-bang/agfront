import { inject, observer } from "mobx-react";

import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';

function EX_PreviewDialog(props) {
    const { title, id, onStart, close_button_label, stream_source } = props;
    const [open, setOpen] = React.useState(false);

    const disabled = id < 0 ? true : false;

    const handleClickOpen = (event) => {
        onStart(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Tooltip title={title}>
                <IconButton onClick={handleClickOpen} disabled={disabled}>
                    <OndemandVideoIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                fullWidth
                maxWidth="lg"
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
            >
                <DialogTitle id="dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <video className="Preview-Video" autoPlay>
                        <source src={stream_source} />
                    </video>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {close_button_label}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

const PreviewDialog = inject(({ app_store, manager }) => ({
    title: app_store.strings.preview,
    close_button_label: app_store.strings.close,
    onStart: manager.setStreamSource,
    stream_source: manager.stream_source,
}))(observer(EX_PreviewDialog));

export default PreviewDialog;