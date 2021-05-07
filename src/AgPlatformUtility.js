function getTimingString(script, index, default_timing) {
    if (script.length > 0) {
        const ret = "#" + (index + 1).toString() + "(" + script.charAt(index) + ")";
        return ret;
    }
    return default_timing;
}

function responseToSettings(response, options) {
    function obj(r, o) {
        return {
            checked: true,
            value: (r ? r : o),
        }
    }

    return {
        quality: obj(response.render_config, Object.keys(options.quality)[0]),
        fps: obj(response.fps, Object.keys(options.fps)[0]),
        actor: obj(response.model, Object.keys(options.actor)[0]),
        script: obj(response.script, "FIXME"),
        voice: obj(response.speaker, Object.keys(options.voice)[0]),
        speed: obj(response.speed, 1),
        motion: obj(response.anim, Object.keys(options.motion)[0]),
        timing: obj(response.timing, 0),
    }
}

export {
    getTimingString,
    responseToSettings,
};