import { inject, observer } from "mobx-react";

import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

import TooltipIconButton from 'components/inputs/TooltipIconButton';

const _MotionTimingButton = (props) => {
    return (<TooltipIconButton startIcon={<EmojiPeopleIcon />} {...props} />);
}

const MotionTimingButton = inject(({ app_store }) => ({
    tooltip: app_store.strings.motion_timing_title,
}))(observer(_MotionTimingButton));

export default MotionTimingButton;