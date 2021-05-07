import { inject, observer } from "mobx-react";

import { makeStyles } from '@material-ui/core/styles';

import Select from 'components/inputs/Select';

const useStyles = makeStyles((theme) => ({
    input: {
        marginTop: theme.spacing(1),
    },
}));

const _ActorInput = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.input}>
            <Select {...props} />
        </div>
    );
}

const ActorInput = inject(({ app_store }) => ({
    options: app_store.options.actor,
    label: app_store.strings.actor,
}))(observer(_ActorInput));

export default ActorInput;