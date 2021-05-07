import { inject, observer } from "mobx-react";

import TooltipIconButton from 'components/inputs/TooltipIconButton';

import VideocamIcon from '@material-ui/icons/Videocam';

const RenderButton = inject(({ app_store, creater }) => ({
    tooltip: app_store.strings.render,
    onClick: creater.renderMedia,
    startIcon: <VideocamIcon />,
    disabled: creater.render_state === "wait",
}))(observer(TooltipIconButton));

export default RenderButton;