import { inject, observer } from "mobx-react";

import {
    TextField
} from '@material-ui/core';

const motion_directive = (options, motion) => {
    if (!options) {
        return null;
    }
    if (!options.motion) {
        return null;
    }
    return options.motion[motion];
}

const emotion_directive = (options, emotion) => {
    if (!options) {
        return null;
    }
    if (!options.emotion) {
        return null;
    }
    return options.emotion[emotion];
}

const _ScenarioIndicator = (props) => {
    const { options, motion_label, emotion_label, spec } = props;

    const script = spec.script;
    const motion = spec.motion;
    const emotion = spec.emotion;
    const motion_timing = spec.motion_timing;
    const emotion_timing = spec.emotion_timing;

    let text = "";
    const text_motion = motion_label + ': ' + motion_directive(options, motion);
    const text_emotion = emotion_label + ': ' + emotion_directive(options, emotion);

    if (motion_timing < emotion_timing) {
        const text1 = script.slice(0, motion_timing);
        const text2 = script.slice(motion_timing, emotion_timing);
        const text3 = script.slice(emotion_timing);
        text = text1 + '(' + text_motion + ')' + text2 + '(' + text_emotion + ')' + text3;
    } else if (motion_timing > emotion_timing) {
        const text1 = script.slice(0, emotion_timing);
        const text2 = script.slice(emotion_timing, motion_timing);
        const text3 = script.slice(motion_timing);
        text = text1 + '(' + text_emotion + ')' + text2 + '(' + text_motion + ')' + text3;
    } else {
        const text1 = script.slice(0, motion_timing);
        const text2 = script.slice(motion_timing);
        text = text1 + '(' + text_motion + ', ' + text_emotion + ')' + text2;
    }

    return (
        <TextField
            fullWidth
            multiline
            InputProps={{
                readOnly: true,
            }}
            variant="outlined"
            value={text}
        />
    );
}

const ScenarioIndicator = inject(({ app_store }) => ({
    options: app_store.options,
    motion_label: app_store.strings.motion,
    emotion_label: app_store.strings.emotion,
}))(observer(_ScenarioIndicator));

export default ScenarioIndicator;