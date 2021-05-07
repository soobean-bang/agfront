import { inject, observer } from "mobx-react";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import QualityInput from 'components/inputs/SpecInput/QualityInput';
import FpsInput from 'components/inputs/SpecInput/FpsInput';
import ActorInput from 'components/inputs/SpecInput/ActorInput';
import VoiceInput from 'components/inputs/SpecInput/VoiceInput';
import ScriptInput from 'components/inputs/SpecInput/ScriptInput';
import SpeechSpeedInput from 'components/inputs/SpecInput/SpeechSpeedInput';
import MotionInput from 'components/inputs/SpecInput/MotionInput';
import MotionSpeedInput from 'components/inputs/SpecInput/MotionSpeedInput';
import EmotionInput from 'components/inputs/SpecInput/EmotionInput';
import MotionTimingButton from 'components/Buttons/MotionTimingButton';
import EmotionTimingButton from 'components/Buttons/EmotionTimingButton';
import MotionTimingDialog from 'components/Dialogs/MotionTimingDialog';
import EmotionTimingDialog from 'components/Dialogs/EmotionTimingDialog';
import { makeStyles, Switch } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
    },
    switch: {
        flexShrink: 0,
    },
    input: {
        flexGrow: 1,
    }
}))

const _Filter = (props) => {
    const classes = useStyles();

    const { value, onValueChange, input } = props;

    const handleSwitchChange = (event) => {
        if (!event.target.checked) {
            onValueChange(undefined);
        }
    }

    let checked = true;
    if (value === undefined) {
        checked = false;
    }
    if (value === "") {
        checked = false;
    }

    return (
        <div className={classes.row}>
            <div className={classes.switch}>
                <Switch
                    disabled={!value}
                    checked={checked}
                    onChange={handleSwitchChange}
                />
            </div>
            <div className={classes.input}>
                {input}
            </div>
        </div>
    );
}

const Filter = (observer)(_Filter);

const _QualityFilter = (props) => {
    const { value, onValueChange } = props;

    const input = <QualityInput value={value} onValueChange={onValueChange} />;

    return (<Filter input={input} {...props} />);
}

const QualityFilter = inject(({ manager }) => ({
    value: manager.spec.quality,
    onValueChange: manager.setQuality,
}))(observer(_QualityFilter));

const _FpsFilter = (props) => {
    const { value, onValueChange } = props;

    const input = <FpsInput value={value} onValueChange={onValueChange} />;

    return (<Filter input={input} {...props} />);
}

const FpsFilter = inject(({ manager }) => ({
    value: manager.spec.fps,
    onValueChange: manager.setFps,
}))(observer(_FpsFilter));

const _ActorFilter = (props) => {
    const { value, onValueChange } = props;

    const input = <ActorInput value={value} onValueChange={onValueChange} />;

    return (<Filter input={input} {...props} />);
}

const ActorFilter = inject(({ manager }) => ({
    value: manager.spec.actor,
    onValueChange: manager.setActor,
}))(observer(_ActorFilter));

const _VoiceFilter = (props) => {
    const { value, onValueChange } = props;

    const input = <VoiceInput value={value} onValueChange={onValueChange} />;

    return (<Filter input={input} {...props} />);
}

const VoiceFilter = inject(({ manager }) => ({
    value: manager.spec.voice,
    onValueChange: manager.setVoice,
}))(observer(_VoiceFilter));

const _ScriptFilter = (props) => {
    const { value, onValueChange } = props;

    const input = <ScriptInput value={value} onValueChange={onValueChange} />;

    return (<Filter input={input} {...props} />);
}

const ScriptFilter = inject(({ manager }) => ({
    value: manager.spec.script,
    onValueChange: manager.setScript,
}))(observer(_ScriptFilter));

const _SpeechSpeedFilter = (props) => {
    const { value, onValueChange } = props;

    const input = <SpeechSpeedInput value={value} onValueChange={onValueChange} />;

    return (<Filter input={input} {...props} />);
}

const SpeechSpeedFilter = inject(({ manager }) => ({
    value: manager.spec.speech_speed,
    onValueChange: manager.setSpeechSpeed,
}))(observer(_SpeechSpeedFilter));

const _MotionFilter = (props) => {
    const { value, onValueChange } = props;

    const input = <MotionInput value={value} onValueChange={onValueChange} />;

    return (<Filter input={input} {...props} />);
}

const MotionFilter = inject(({ manager }) => ({
    value: manager.spec.motion,
    onValueChange: manager.setMotion,
}))(observer(_MotionFilter));

const _MotionSpeedFilter = (props) => {
    const { value, onValueChange } = props;

    const input = <MotionSpeedInput value={value} onValueChange={onValueChange} />;

    return (<Filter input={input} {...props} />);
}

const MotionSpeedFilter = inject(({ manager }) => ({
    value: manager.spec.motion_speed,
    onValueChange: manager.setMotionSpeed,
}))(observer(_MotionSpeedFilter));

const _EmotionFilter = (props) => {
    const { value, onValueChange } = props;

    const input = <EmotionInput value={value} onValueChange={onValueChange} />;

    return (<Filter input={input} {...props} />);
}

const EmotionFilter = inject(({ manager }) => ({
    value: manager.spec.emotion,
    onValueChange: manager.setEmotion,
}))(observer(_EmotionFilter));

const MotionTimingButtonM = inject(({ manager }) => ({
    disabled: !manager.timing_enabled,
    onClick: manager.openMotionTimingDialog,
}))(MotionTimingButton);

const EmotionTimingButtonM = inject(({ manager }) => ({
    disabled: !manager.timing_enabled,
    onClick: manager.openEmotionTimingDialog,
}))(EmotionTimingButton);

const MotionTimingDialogM = inject(({ manager }) => ({
    script: manager.spec.script,
    onValueChanged: manager.setMotionTiming,
    open: manager.motion_timing_dialog_open,
    handleClose: manager.closeMotionTimingDialog,
}))(MotionTimingDialog);

const EmotionTimingDialogM = inject(({ manager }) => ({
    script: manager.spec.script,
    onValueChanged: manager.setEmotionTiming,
    open: manager.emotion_timing_dialog_open,
    handleClose: manager.closeEmotionTimingDialog,
}))(EmotionTimingDialog);

function _FilterDialog(props) {
    const {
        open,
        handleClose,
        title,
        close_button_label,
    } = props;

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
                    <QualityFilter />
                    <FpsFilter />
                    <ActorFilter />
                    <VoiceFilter />
                    <ScriptFilter />
                    <SpeechSpeedFilter />
                    <MotionFilter />
                    <MotionSpeedFilter />
                    <EmotionFilter />
                    <MotionTimingButtonM />
                    <EmotionTimingButtonM />
                    <MotionTimingDialogM />
                    <EmotionTimingDialogM />
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

const FilterDialog = inject(({ app_store, manager }) => ({
    open: manager.filter_dialog_open,
    handleClose: manager.closeFilterDialog,
    title: app_store.strings.filter_title,
    close_button_label: app_store.strings.close,
}))(observer(_FilterDialog));

export default FilterDialog;