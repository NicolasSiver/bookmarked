import { Drawer, LinearProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { getVersion } from "../../util/get-version";
import { getSettingsOpen, getSettingsStorageQuota } from "../../model/selectors";

export const Settings = (props) => {
    const settingsOpen = useSelector(getSettingsOpen);
    const storageQuota = useSelector(getSettingsStorageQuota);

    const toggleSettings = () => {
        props.toggleSettings();
    };

    return (
        < div className="settings">
            <Drawer
                anchor="right"
                open={settingsOpen}
                onClose={toggleSettings}>
                <div className="settings__content">
                    <p>Version: <span className="settings__content-value">{getVersion()}</span></p>
                    <p>Storage usage: <span className="settings__content-value">{Number(storageQuota).toFixed(1)}%</span></p>
                    <LinearProgress variant="determinate" value={storageQuota} />
                </div>
            </Drawer>
        </div>
    );
};
