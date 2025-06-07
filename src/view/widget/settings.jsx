import { Drawer } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { getVersion } from "../../util/get-version";
import { getSettingsOpen } from "../../model/selectors";

export const Settings = (props) => {
    const settingsOpen = useSelector(getSettingsOpen);

    return (
        < div className="settings">
            <Drawer
                anchor="right"
                open={settingsOpen}
                onClose={props.onClose}>
                <div className="settings__content">
                    <h2>Settings</h2>
                    <p>Version: {getVersion()}</p>
                    <p>TODO: Work in progress...</p>
                </div>
            </Drawer>
        </div>
    );
};
