import { inject, observer } from "mobx-react";

import { makeStyles } from '@material-ui/core/styles';

import Select from 'components/inputs/Select';

const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: theme.spacing(1),
    },
}));

const _EmotionInput = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.input}>
            <Select {...props} />
        </div>
    );
}

const EmotionInput = inject(({ app_store }) => ({
    options: app_store.options.emotion,
    label: app_store.strings.emotion,
}))(observer(_EmotionInput));

export default EmotionInput;