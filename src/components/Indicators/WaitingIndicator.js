import { inject, observer } from "mobx-react";

import Tooltip from '@material-ui/core/Tooltip';

import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

const EX_WatingIndicator = ((props) => {
    const { tooltip } = props;

    return (
        <Tooltip title={tooltip}>
            <HourglassEmptyIcon fontSize="large" color="primary" />
        </Tooltip>
    );
})

const WaitingIndicator = inject(({ app_store }) => ({
    tooltip: app_store.strings.waiting,
}))(observer(EX_WatingIndicator));

export default WaitingIndicator;