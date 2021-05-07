import { makeObservable, observable, computed, action } from 'mobx';

import {
    renderMedia,
} from "AgPlatformClient.js";

export default class CreaterStore {
    spec = {
        script: "",
    };
    motion_timing_dialog_open = false;
    emotion_timing_dialog_open = false;
    request_result_dialog_open = false;
    request_state = "";

    get timing_enabled() {
        return this.spec.script;
    }

    constructor(root) {
        this.root = root;

        makeObservable(this, {
            spec: observable,
            timing_enabled: computed,
            motion_timing_dialog_open: observable,
            openMotionTimingDialog: action,
            closeMotionTimingDialog: action,
            emotion_timing_dialog_open: observable,
            openEmotionTimingDialog: action,
            closeEmotionTimingDialog: action,
            request_result_dialog_open: observable,
            closeRequestResultDialog: action,
            request_state: observable,
        });
    }

    specInit = (options) => {
        this.spec.quality = Object.keys(options["quality"])[0];
        this.spec.fps = Object.keys(options["fps"])[0];
        this.spec.actor = Object.keys(options["actor"])[0];
        this.spec.script = "";
        this.spec.voice = Object.keys(options["voice"])[0];
        this.spec.speech_speed = 1.0;
        this.spec.motion = Object.keys(options["motion"])[0];
        this.spec.motion_timing = 0;
        this.spec.motion_speed = 1.0;
        this.spec.emotion = Object.keys(options["emotion"])[0];
        this.spec.emotion_timing = 0;
    }

    setQuality = (value) => {
        this.spec.quality = value;
    }

    setFps = (value) => {
        this.spec.fps = value;
    }

    setActor = (value) => {
        this.spec.actor = value;
    }

    setScript = (value) => {
        this.spec.script = value;
        this.spec.motion_timing = 0;
        this.spec.emotin_timing = 0;
    }

    setVoice = (value) => {
        this.spec.voice = value;
    }

    setSpeechSpeed = (value) => {
        this.spec.speech_speed = value;
    }

    setMotion = (value) => {
        this.spec.motion = value;
    }

    setMotionSpeed = (value) => {
        this.spec.motion_speed = value;
    }

    setMotionTiming = (value) => {
        this.spec.motion_timing = value;
    }

    setEmotion = (value) => {
        this.spec.emotion = value;
    }

    setEmotionTiming = (value) => {
        this.spec.emotion_timing = value;
    }

    specToForm = (spec) => {
        return {
            script: spec.script,
            speaker: spec.voice,
            speed: spec.speech_speed,
            anim: spec.motion,
            animstartsyl: spec.motion_timing,
            emotion: spec.emotion,
            emotionstartsyl: spec.emotion_timing,
            gender: spec.actor,
            fps: spec.fps,
            renderconfig: spec.quality,
        };
    }

    renderMedia = () => {
        if (this.request_state === "wait") {
            return;
        }
        this.request_state = "wait";

        this.root.videos(this.spec
        ).then((array_of_media_info) => {
            const media_info = array_of_media_info[0];
            if (media_info.progress.task_id) {
                this.request_state = "already_rendered";
                this.request_result_dialog_open = true;
                return;
            }
            renderMedia(this.specToForm(media_info.spec)).then((response) => {
                return response.json();
            }).then((json) => {
                this.request_state = "success";
                this.request_result_dialog_open = true;
            });
        });
    }

    openMotionTimingDialog = () => {
        this.motion_timing_dialog_open = true;
    }

    closeMotionTimingDialog = () => {
        this.motion_timing_dialog_open = false;
    }

    openEmotionTimingDialog = () => {
        this.emotion_timing_dialog_open = true;
    }

    closeEmotionTimingDialog = () => {
        this.emotion_timing_dialog_open = false;
    }

    openRequestResultDialog = () => {
        this.request_result_dialog_open = true;
    }

    closeRequestResultDialog = () => {
        this.request_result_dialog_open = false;
    }
}