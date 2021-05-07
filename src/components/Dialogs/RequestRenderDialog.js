import { inject, observer } from "mobx-react";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import InfoIcon from '@material-ui/icons/Info';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


function _RequestRenderDialog(props) {
    const {
        title,
        close_button_label,
        message_already_rendered,
        message_request_success,
        request_state,
        open,
        handleClose
    } = props;

    let icon;
    let message;

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
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
            >
                <DialogTitle id="dialog-title">{title}</DialogTitle>
                <DialogContent>
                    {icon}
                    {message}
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

const RequestRenderDialog = inject(({ app_store, creater }) => ({
    title: app_store.strings.request_result,
    close_button_label: app_store.strings.close,
    message_already_rendered: app_store.strings.message_already_rendered,
    message_request_success: app_store.strings.message_request_success,
    request_state: creater.request_state,
    open: creater.request_result_dialog_open,
    handleClose: creater.closeRequestResultDialog,
}))(observer(_RequestRenderDialog));

export default RequestRenderDialog;