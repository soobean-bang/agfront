import { inject, observer } from "mobx-react";

import { makeStyles } from '@material-ui/core/styles';

import Number from 'components/inputs/Number';

const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: theme.spacing(1),
    },
}));

const _MotionSpeedInput = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.input}>
            <Number fullWidth InputLabelProps={{ shrink: true }} {...props} />
        </div>
    );
}

const MotionSpeedInput = inject(({ app_store }) => ({
    options: app_store.options.motion_speed,
    label: app_store.strings.motion_speed,
}))(observer(_MotionSpeedInput));

export default MotionSpeedInput;