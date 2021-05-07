import { inject, observer } from "mobx-react";

import Folder from 'components/Folders/Folder';

import QualityInput from 'components/inputs/Creater/Quality';
import FpsInput from 'components/inputs/Creater/Fps';

const _GeneralFolder = (props) => {
    const contents =
        <>
            <QualityInput />
            <FpsInput />
        </>;

    return (
        <Folder
            contents={contents}
            {...props}
        />
    );
}

const GeneralFolder = inject(({ app_store }) => ({
    label: app_store.strings.general_settings,
}))(observer(_GeneralFolder));

export default GeneralFolder;