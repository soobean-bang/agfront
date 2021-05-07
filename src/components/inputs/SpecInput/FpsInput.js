import { inject, observer } from "mobx-react";

import { makeStyles } from '@material-ui/core/styles';

import Select from 'components/inputs/Select';

const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: theme.spacing(1),
    },
}));

const _FpsInput = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.input}>
            <Select {...props} />
        </div>
    );
}

const FpsInput = inject(({ app_store }) => ({
    options: app_store.options.fps,
    label: app_store.strings.fps,
}))(observer(_FpsInput));

export default FpsInput;