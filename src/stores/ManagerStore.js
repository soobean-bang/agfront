import { makeObservable, observable, action } from 'mobx';

import {
    streamMedia,
    cancelRender,
} from "AgPlatformClient.js";

//TODO Store Dividing
export default class ManagerStore {
    array_of_media_info = [];
    spec = {};
    filter_dialog_open = false;
    page = 0;
    stream_source = "";
    download_array = [];

    constructor(root) {
        this.root = root;

        makeObservable(this, {
            array_of_media_info: observable,
            spec: observable,
            filter_dialog_open: observable,
            openFilterDialog: action,
            closeFilterDialog: action,
            page: observable,
            stream_source: observable,
            download_array: observable,
            setArrayOfMediaInfo: action,
            setPage: action,
            setStreamSource: action,
            setQuality: action,
            setFps: action,
            setActor: action,
            setScript: action,
            setVoice: action,
            setSpeechSpeed: action,
            setMotion: action,
            setMotionSpeed: action,
            setMotionTiming: action,
            setEmotion: action,
            setEmotionTiming: action,
        });
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
        this.spec.motion_timing = undefined;
        this.spec.emotin_timing = undefined;
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

    applyFilter = () => {
        this.root.videos(this.spec).then((array_of_media_info) => {
            this.setArrayOfMediaInfo(array_of_media_info);
        })
    }

    setArrayOfMediaInfo = (array_of_media_info) => {
        this.array_of_media_info = array_of_media_info;
        this.page = 0;
    }

    setPage = (page) => {
        this.page = page;
    }

    setStreamSource = (id) => {
        this.stream_source = streamMedia(id);
    }

    cancelRender = (task_id) => {
        cancelRender(task_id).then((response) => {
            this.applyFilter();
        });
    }

    openFilterDialog = () => {
        this.filter_dialog_open = true;
    }

    closeFilterDialog = () => {
        this.filter_dialog_open = false;
        this.applyFilter();
    }
}