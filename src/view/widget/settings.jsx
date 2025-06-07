import { Drawer } from "@mui/material";
import React from "react";

import { getVersion } from "../../util/get-version";

export const Settings = (props) => {
    return (
        < div className="settings">
            <Drawer
                anchor="right"
                open={false}
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
