import { inject, observer } from "mobx-react";

import { makeStyles } from '@material-ui/core/styles';

import {
    Toolbar,
    ButtonGroup,
} from '@material-ui/core';

import QualityInput from 'components/inputs/SpecInput/QualityInput';
import FpsInput from 'components/inputs/SpecInput/FpsInput';
import ActorInput from 'components/inputs/SpecInput/ActorInput';
import VoiceInput from 'components/inputs/SpecInput/VoiceInput';
import ScriptInput from 'components/inputs/SpecInput/ScriptInput';
import SpeechSpeedInput from 'components/inputs/SpecInput/SpeechSpeedInput';
import MotionInput from 'components/inputs/SpecInput/MotionInput';
import MotionSpeedInput from 'components/inputs/SpecInput/MotionSpeedInput';
import EmotionInput from 'components/inputs/SpecInput/EmotionInput';
import ScenarioIndicator from 'components/Indicators/ScenarioIndicator';
import MotionTimingButton from 'components/Buttons/MotionTimingButton';
import EmotionTimingButton from 'components/Buttons/EmotionTimingButton';
import RenderButton from 'components/Buttons/RenderButton';
import MotionTimingDialog from 'components/Dialogs/MotionTimingDialog';
import EmotionTimingDialog from 'components/Dialogs/EmotionTimingDialog';
import RequestRenderDialog from 'components/Dialogs/RequestRenderDialog';
import Folder from 'components/Folders/Folder';

const panelWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    toolbar: {
        backgroundColor: theme.palette.primary.light,
    },
    content: {
        display: 'flex',
    },
    left: {
        width: `calc(50% - ${panelWidth/2}px)`,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: theme.spacing(1),
    },
    middle: {
        width: `calc(50% - ${panelWidth / 2}px)`,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: theme.spacing(1),
    },
    right: {
        width: panelWidth,
    },
}));

const QualityInputC = inject(({ creater }) => ({
    value: creater.spec.quality,
    onValueChange: creater.setQuality,
}))(QualityInput);

const FpsInputC = inject(({ creater }) => ({
    value: creater.spec.fps,
    onValueChange: creater.setFps,
}))(FpsInput);

const _GeneralFolder = (props) => {
    const { label } = props;

    return (
        <Folder label={label}>
            <QualityInputC />
            <FpsInputC />
        </Folder>
    );
}

const GeneralFolder = inject(({ app_store }) => ({
    label: app_store.strings.general_settings,
}))(observer(_GeneralFolder));

const ActorInputC = inject(({ creater }) => ({
    value: creater.spec.actor,
    onValueChange: creater.setActor,
}))(ActorInput);

const VoiceInputC = inject(({ creater }) => ({
    value: creater.spec.voice,
    onValueChange: creater.setVoice,
}))(VoiceInput);

const _ActorFolder = (props) => {
    const { label } = props;

    return (
        <Folder label={label}>
            <ActorInputC />
            <VoiceInputC />
        </Folder>
    );
}

const ActorFolder = inject(({ app_store }) => ({
    label: app_store.strings.actor_settings,
}))(observer(_ActorFolder));

const ScriptInputC = inject(({ creater }) => ({
    value: creater.spec.script,
    onValueChange: creater.setScript,
}))(ScriptInput);

const SpeechSpeedInputC = inject(({ creater }) => ({
    value: creater.spec.speech_speed,
    onValueChange: creater.setSpeechSpeed,
}))(SpeechSpeedInput);

const MotionInputC = inject(({ creater }) => ({
    value: creater.spec.motion,
    onValueChange: creater.setMotion,
}))(MotionInput);

const MotionSpeedInputC = inject(({ creater }) => ({
    value: creater.spec.motion_speed,
    onValueChange: creater.setMotionSpeed,
}))(MotionSpeedInput);

const EmotionInputC = inject(({ creater }) => ({
    value: creater.spec.emotion,
    onValueChange: creater.setEmotion,
}))(EmotionInput);

const ScenarioIndicatorC = inject(({ creater }) => ({
    spec: creater.spec,
}))(ScenarioIndicator);

const MotionTimingButtonC = inject(({ creater }) => ({
    disabled: !creater.timing_enabled,
    onClick: creater.openMotionTimingDialog,
}))(MotionTimingButton);

const EmotionTimingButtonC = inject(({ creater }) => ({
    disabled: !creater.timing_enabled,
    onClick: creater.openEmotionTimingDialog,
}))(EmotionTimingButton);

const MotionTimingDialogC = inject(({ creater }) => ({
    script: creater.spec.script,
    onValueChanged: creater.setMotionTiming,
    open: creater.motion_timing_dialog_open,
    handleClose: creater.closeMotionTimingDialog,
}))(MotionTimingDialog);

const EmotionTimingDialogC = inject(({ creater }) => ({
    script: creater.spec.script,
    onValueChanged: creater.setEmotionTiming,
    open: creater.emotion_timing_dialog_open,
    handleClose: creater.closeEmotionTimingDialog,
}))(EmotionTimingDialog);

const MovieCreater = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.toolbar}>
                <Toolbar variant='dense'>
                    Movie Creater
                </Toolbar>
            </div>
            <div className={classes.content}>
                <div className={classes.left}>
                    <ScriptInputC />
                    <SpeechSpeedInputC />
                    <MotionInputC />
                    <MotionSpeedInputC />
                    <EmotionInputC />
                </div>
                <div className={classes.middle}>
                    <div>
                        <ScenarioIndicatorC />
                        <ButtonGroup fullWidth>
                            <MotionTimingButtonC />
                            <EmotionTimingButtonC />
                        </ButtonGroup>
                        <MotionTimingDialogC />
                        <EmotionTimingDialogC />
                    </div>
                    <ButtonGroup fullWidth>
                        <RenderButton />
                    </ButtonGroup>
                    <RequestRenderDialog />
                </div>
                <div className={classes.right}>
                    <GeneralFolder />
                    <ActorFolder />
                </div>
            </div>
        </div>
    );
}

export default MovieCreater;