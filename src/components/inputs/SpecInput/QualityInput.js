import { inject, observer } from "mobx-react";

import { makeStyles } from '@material-ui/core/styles';

import Select from 'components/inputs/Select';

const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: theme.spacing(1),
    },
}));

const _QualityInput = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.input}>
            <Select {...props} />
        </div>
    );
}

const QualityInput = inject(({ app_store }) => ({
    options: app_store.options.quality,
    label: app_store.strings.quality,
}))(observer(_QualityInput));

export default QualityInput;