import { inject, observer } from "mobx-react";

import { makeStyles } from '@material-ui/core/styles';

import Select from 'components/inputs/Select';

const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: theme.spacing(1),
    },
}));

const _MotionInput = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.input}>
            <Select {...props} />
        </div>
    );
}

const MotionInput = inject(({ app_store }) => ({
    options: app_store.options.motion,
    label: app_store.strings.motion,
}))(observer(_MotionInput));

export default MotionInput;