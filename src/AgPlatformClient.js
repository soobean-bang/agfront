import * as AGHost from './AgHost.js'

const _protocol_host_ = AGHost.protocol + AGHost.host;
const _api_server_ = _protocol_host_ + '/api/v1/';

const _config_ = _api_server_ + 'config/';

const _videos_ = _api_server_ + 'videos/';
const _videos_download_ = _videos_ + 'download/';
const _videos_stream_ = _videos_ + 'stream/';

const _render_ = _api_server_ + 'render/';
const _render_progress_ = _render_ + 'progress/';
const _render_cancel_ = _render_ + 'cancel/';

function download(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // the filename you want
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function queryOptions(language) {
    //TODO language

    const url = _config_;

    return fetch(url, {
        mode: 'cors',
    });
}

function searchMedia(form) { //search Video
    var url = _videos_ + form;
    url = encodeURI(url);

    return fetch(url,
        {
            mode: 'cors',
            headers: { 'Accept': 'application/json' }
        }).then((response) => {
            return response.json();
        });
}

function renderMedia(json) {//Render Video
    const url = _render_;
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json)
    }).then((response) => {
        return response;
    });
};

function getRenderProgress(task_id) {
    const url = _render_progress_ + task_id;
    return fetch(url, {
        mode: 'cors',
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
}

function streamMedia(id) {
    const url = _videos_stream_ + '?video_id=' + id.toString();
    return url;
}

function cancelRender(task_id) {
    const url = _render_cancel_ + task_id;
    return (fetch(url, {
        method: 'POST',
        mode: 'cors',
    })).then((response) => {
        return response;
    })
}

function downloadMedia(id) {//download Video
    const url = _videos_download_ + id.toString();
    return fetch(url,
        {
            method: 'GET',
            mode: 'cors',
        }).then((response) => {
            response.blob().then(blob => download(blob, id.toString()))
            return response;
        });
}

export {
    queryOptions,
    searchMedia,
    renderMedia,
    getRenderProgress,
    streamMedia,
    cancelRender,
    downloadMedia,
};