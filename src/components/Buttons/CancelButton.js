import { inject, observer } from "mobx-react";

import {
    IconButton,
    Tooltip,
} from '@material-ui/core'

import ClearIcon from '@material-ui/icons/Clear';

const _CancelButton = (props) => {
    const { tooltip, _onClick, task_id, ...ButtonProps } = props;

    const onClick = () => {
        return _onClick(task_id);
    }

    return (
        <Tooltip title={tooltip}>
            <IconButton
                onClick={onClick}
                {...ButtonProps}
            >
                <ClearIcon />
            </IconButton>
        </Tooltip>
    );
}

const CancelButton = inject(({ app_store, manager }) => ({
    tooltip: app_store.strings.cancel,
    _onClick: manager.cancelRender,
}))(observer(_CancelButton));

export default CancelButton;