import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TimingInput from 'components/inputs/SpecInput/TimingInput';

export default function TimingDialog(props) {
    const { script, onValueChanged, open, handleClose, title, desc, close_button_label } = props;

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
            >
                <DialogTitle id="dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-description">
                        {desc}
                    </DialogContentText>
                    <TimingInput script={script} onValueChanged={onValueChanged} closer={handleClose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {close_button_label}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}