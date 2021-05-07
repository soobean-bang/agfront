import { inject, observer } from "mobx-react";

import Tooltip from '@material-ui/core/Tooltip';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const EX_CompleteIndicator = ((props) => {
    const { tooltip } = props;

    return (
        <Tooltip title={tooltip}>
            <CheckCircleOutlineIcon fontSize="large" color="primary" />
        </Tooltip>
    );
})

const CompleteIndicator = inject(({ app_store }) => ({
    tooltip: app_store.strings.complete,
}))(observer(EX_CompleteIndicator));

export default CompleteIndicator;