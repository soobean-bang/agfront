import React from 'react';

import { inject, observer } from "mobx-react";

import WaitingIndicator from './WaitingIndicator.js';
import FailureIndicator from './FailureIndicator.js';
import CompleteIndicator from './CompleteIndicator';
import ProgressIndicator from './ProgressIndicator';

const _StateIndicator = (props) => {
    const { progress, startUpdateProgress, endUpdateProgress } = props;

    React.useEffect(() => {
        startUpdateProgress(progress);

        return function cleanup() {
            endUpdateProgress(progress);
        }
    })

    switch (progress.task_state) {
        case "RECEIVED":
        case "PENDING":
            return <WaitingIndicator />;
        case "STARTED":
        case "PROGRESS":
            return <ProgressIndicator progress={progress} />;
        case "SUCCESS":
            return <CompleteIndicator />
        default:
            return <FailureIndicator />;
    }
};

const StateIndicator = inject(({ app_store }) => ({
    startUpdateProgress: app_store.startUpdateProgress,
    endUpdateProgress: app_store.endUpdateProgress,
}))(observer(_StateIndicator));

export default StateIndicator;