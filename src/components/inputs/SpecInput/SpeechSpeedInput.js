import { inject, observer } from "mobx-react";

import { makeStyles } from '@material-ui/core/styles';

import Number from 'components/inputs/Number';

const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: theme.spacing(1),
    },
}));

const _SpeechSpeedInput = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.input}>
            <Number fullWidth InputLabelProps={{ shrink: true }} {...props} />
        </div>
    );
}

const SpeechSpeedInput = inject(({ app_store }) => ({
    options: app_store.options.speech_speed,
    label: app_store.strings.speech_speed,
}))(observer(_SpeechSpeedInput));

export default SpeechSpeedInput;