import { inject, observer } from "mobx-react";

import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import TooltipIconButton from 'components/inputs/TooltipIconButton';

const _EmotionTimingButton = (props) => {
    return (<TooltipIconButton startIcon={<EmojiEmotionsIcon />} {...props} />);
}

const EmotionTimingButton = inject(({ app_store, creater }) => ({
    tooltip: app_store.strings.emotion_timing_title,
}))(observer(_EmotionTimingButton));

export default EmotionTimingButton;