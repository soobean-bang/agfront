import { observer } from "mobx-react";

import Tooltip from '@material-ui/core/Tooltip';

import CircularProgressWithLabel from 'components/CircularProgressWithLabel.js';

const EX_ProgressIndicator = ((props) => {
    const { progress } = props;

    const tooltip = progress.current.toString() + " / " + progress.total.toString() + " frames.";
    const value = 100.0 * progress.current / progress.total;

    return (
        <Tooltip title={tooltip}>
            <div>
                <CircularProgressWithLabel value={value} />
            </div>
        </Tooltip>
    );
})

const ProgressIndicator = observer(EX_ProgressIndicator);

export default ProgressIndicator;