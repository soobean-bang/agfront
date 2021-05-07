import { inject, observer } from "mobx-react";

import Folder from 'components/Folders/Folder';

import Voice from 'components/inputs/Creater/Voice';
import Speed from 'components/inputs/Creater/Speed';

const _SpeechFolder = (props) => {
    const contents =
        <>
            <Voice />
            <Speed />
        </>;

    return (
        <Folder
            contents={contents}
            {...props}
        />
    );
}

const SpeechFolder = inject(({ app_store }) => ({
    label: app_store.strings.speech_settings,
}))(observer(_SpeechFolder));

export default SpeechFolder;