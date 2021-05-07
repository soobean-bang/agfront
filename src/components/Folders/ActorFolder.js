import { inject, observer } from "mobx-react";

import Folder from 'components/Folders/Folder';

import Actor from 'components/inputs/Creater/Actor';
import Voice from 'components/inputs/Creater/Voice';

const _ActorFolder = (props) => {
    const contents =
        <>
            <Actor />
            <Voice />
        </>;

    return (
        <Folder
            contents={contents}
            {...props}
        />
    );
}

const ActorFolder = inject(({ app_store }) => ({
    label: app_store.strings.actor_settings,
}))(observer(_ActorFolder));

export default ActorFolder;