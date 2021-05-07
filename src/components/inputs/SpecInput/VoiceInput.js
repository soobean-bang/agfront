import { inject, observer } from "mobx-react";

import { makeStyles } from '@material-ui/core/styles';

import Select from 'components/inputs/Select';

const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: theme.spacing(1),
    },
}));

const _VoiceInput = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.input}>
            <Select {...props} />
        </div>
    );
}

const VoiceInput = inject(({ app_store }) => ({
    options: app_store.options.voice,
    label: app_store.strings.voice,
}))(observer(_VoiceInput));

export default VoiceInput;