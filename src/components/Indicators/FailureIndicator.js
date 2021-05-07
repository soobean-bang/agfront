import { inject, observer } from "mobx-react";

import Tooltip from '@material-ui/core/Tooltip';

import FailureIcon from '@material-ui/icons/Error';

const EX_FailureIndicator = ((props) => {
    const { tooltip } = props;

    return (
        <Tooltip title={tooltip}>
            <FailureIcon fontSize="large" color="primary" />
        </Tooltip>
    );
})

const FailureIndicator = inject(({ app_store }) => ({
    tooltip: app_store.strings.error,
}))(observer(EX_FailureIndicator));

export default FailureIndicator;