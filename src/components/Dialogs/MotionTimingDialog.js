import { inject, observer } from "mobx-react";

import TimingDialog from 'components/Dialogs/TimingDialog';

export default inject(({ app_store }) => ({
    title: app_store.strings.motion_timing_title,
    desc: app_store.strings.motion_timing_desc,
    close_button_label: app_store.strings.close,
}))(observer(TimingDialog));