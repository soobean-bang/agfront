import { makeObservable, observable, action } from 'mobx';

import CreaterStore from 'stores/CreaterStore';
import ManagerStore from 'stores/ManagerStore';

import {
    queryOptions,
    searchMedia,
    getRenderProgress,
    downloadMedia,
} from "AgPlatformClient.js";

//TODO Store Dividing
export default class AppStore {
    strings = {
        general_settings: "일반 설정",
        actor_settings: "인물 설정",
        speech_settings: "음성 설정",
        action_settings: "동작 설정",
        script: "대사",
        speech_speed: "음성 속도",
        motion: "동작",
        motion_speed: "동작 속도",
        emotion: "감정 표현",
        quality: "품질",
        fps: "Fps",
        actor: "인물",
        voice: "목소리",
        motion_timing: "동작 시점",
        emotion_timing: "감정 표현 시점",
        motion_timing_title: "동작 시점 설정",
        emotion_timing_title: "감정 표현 시점 설정",
        emotion_timing_desc: "감정 표현이 언제 시작되는지 선택하십시오.",
        apply: "적용",
        close: "닫기",
        default_timing: "시작할 때",
        request: "요청",
        request_result: "요청 결과",
        message_already_rendered: "동일한 요청이 이미 접수되었습니다.",
        message_request_success: "요청이 접수되었습니다.",
        search: "검색",
        result_table_title: "검색 결과",
        padding_label: "좁은 간격",
        progress: "상태",
        command: "요청",
        render: "영상 생성",
        preview: "미리보기",
        download: "내려받기",
        cancel: "생성 취소",
        remove: "제거",
        waiting: "대기중",
        complete: "생성 완료",
        failure: "생성 실패",
        waiting_order: (number) => { return ("대기 순서: " + number.toString()); },
    }

    options = {};

    constructor() {
        makeObservable(this, {
            options: observable,
            parseOptions: action,
        });

        this.queryOptions();
        this.creater = new CreaterStore(this);
        this.manager = new ManagerStore(this);
        //this.composer = new ComposerStore(this);
    }

    queryOptions = () => {
        const language = navigator.language;

        queryOptions(language)
            .then((response) => {
                if (response.ok) {
                    response.json(
                    ).then(json => this.parseOptions(json));
                } else {
                    this.error = response.status;
                }
            });
    }

    parseOptions = (response_object) => {
        this.options.quality = response_object["renderConfig"];
        this.options.fps = response_object["fps"];
        this.options.actor = response_object["gender"];
        this.options.voice = response_object["speaker"];
        this.options.speech_speed = response_object["speed"];
        this.options.motion = response_object["anim"];
        this.options.motion_speed = response_object["animSpeed"];
        this.options.emotion = response_object["emotion"];

        this.creater.specInit(this.options);
    }

    //GET /api/v1/videos/
    //Creater에서 Create 전 중복 여부 확인에 사용.
    //Manager에서 filtering에 사용.
    //Composer에서 사용 가능한 Video list 조회에 사용.
    videos = (spec) => {
        let appended = false;
        let form = "";
        if (spec.script !== undefined) {
            form += (appended ? '&' : '?') + 'script=' + spec.script;
            appended = true;
        }
        if (spec.voice !== undefined) {
            form += (appended ? '&' : '?') + 'speaker=' + spec.voice;
            appended = true;
        }
        if (spec.speech_speed !== undefined) {
            form += (appended ? '&' : '?') + 'speed=' + spec.speech_speed;
            appended = true;
        }
        if (spec.motion !== undefined) {
            form += (appended ? '&' : '?') + 'anim=' + spec.motion;
            appended = true;
        }
        if (spec.motion_speed !== undefined) {
            form += (appended ? '&' : '?') + 'animspeed=' + spec.motion_speed;
            appended = true;
        }
        if (spec.motion_timing !== undefined) {
            form += (appended ? '&' : '?') + 'animstartsyl=' + spec.motion_timing;
            appended = true;
        }
        if (spec.emotion !== undefined) {
            form += (appended ? '&' : '?') + 'emotion=' + spec.emotion;
            appended = true;
        }
        if (spec.emotion_timing !== undefined) {
            form += (appended ? '&' : '?') + 'emotionstartsyl=' + spec.emotion_timing;
            appended = true;
        }
        if (spec.actor !== undefined) {
            form += (appended ? '&' : '?') + 'gender=' + spec.actor;
            appended = true;
        }
        if (spec.fps !== undefined) {
            form += (appended ? '&' : '?') + 'fps=' + spec.fps;
            appended = true;
        }
        if (spec.quality !== undefined) {
            form += (appended ? '&' : '?') + 'renderconfig=' + spec.quality;
            appended = true;
        }

        return searchMedia(form).then((array_of_media_info) => {
            return this.completeMediaInfo(array_of_media_info);
        });
    }

    completeMediaInfo = (array_of_incomplete_media_info) => {
        let array_of_media_info = [];
        array_of_incomplete_media_info.map((media_info) => {
            return array_of_media_info.push({
                id: media_info.rowid,
                spec: {
                    quality: media_info.renderconfig,
                    fps: media_info.fps,
                    actor: media_info.gender,
                    voice: media_info.speaker,
                    script: media_info.script,
                    speech_speed: media_info.speed,
                    motion: media_info.anim,
                    motion_speed: media_info.animspeed,
                    motion_timing: media_info.animstartsyl,
                    emotion: media_info.emotion,
                    emotion_timing: media_info.emotionstartsyl,
                },
                progress: {
                    task_id: media_info.taskid,
                    task_state: media_info.taskstate,
                    current: (media_info.taskstate === "SUCCESS") ? 1 : 0,
                    total: 1,
                },
            });
        });
        return array_of_media_info;
    }

    updateProgress = (progress) => {
        getRenderProgress(progress.task_id).then(result => {
            this.setProgress(progress, result);

            if (!progress.observed) {
                return;
            }

            switch (progress.task_state) {
                case "RECEIVED":
                case "STARTED":
                case "PENDING":
                case "PROGRESS":
                    progress.timer_id = setTimeout(this.updateProgress, 30000, progress);
                break;
                default:
                    this.endUpdateProgress(progress);
            }
        })
    }

    startUpdateProgress = (progress) => {
        if (progress.observed) {
            return;
        }

        switch (progress.task_state) {
            case "RECEIVED":
            case "STARTED":
            case "PENDING":
            case "PROGRESS":
                break;
            default:
                return;
        }

        progress.observed = true;
        this.updateProgress(progress);
    }

    endUpdateProgress = (progress) => {
        progress.observed = false;
        if (progress.timer_id) {
            clearTimeout(progress.timer_id);
            progress.timer_id = undefined;
        }
    }

    setProgress = (old, fresh) => {
        old.state = fresh.task_state;
        old.current = fresh.current;
        old.total = fresh.total;
        if (!old.total) {
            old.total = 1;
        }
    }

    downloadMedia = (id) => {
        downloadMedia(id);
    }

    removeMedia = (id) => { }
}