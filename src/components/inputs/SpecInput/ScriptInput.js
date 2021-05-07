import { inject, observer } from "mobx-react";

import { makeStyles } from '@material-ui/core/styles';

import TextField from 'components/inputs/TextField';

const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: theme.spacing(1),
    },
}));

const _ScriptInput = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.input}>
            <TextField fullWidth InputLabelProps={{ shrink: true }} {...props} />
        </div>
    );
}

const ScriptInput = inject(({ app_store }) => ({
    label: app_store.strings.script,
}))(observer(_ScriptInput));

export default ScriptInput;