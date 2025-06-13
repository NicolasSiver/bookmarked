import { Box, Drawer, LinearProgress, Link } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { getVersion } from "../../util/get-version";
import { getSettingsPanelOpen, getSettingsPanelStorageQuota } from "../../model/selectors";

export const Settings = (props) => {
    const settingsOpen = useSelector(getSettingsPanelOpen);
    const storageQuota = useSelector(getSettingsPanelStorageQuota);

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
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        <div>Version: <span className="settings__content-value">{getVersion()}</span></div>
                        <Link href="https://github.com/NicolasSiver/bookmarked/releases" sx={{px: '1rem'}}>Changelog</Link>
                    </Box>
                    <p>Storage usage: <span className="settings__content-value">{Number(storageQuota).toFixed(1)}%</span></p>
                    <LinearProgress variant="determinate" value={storageQuota} />
                </div>
            </Drawer>
        </div>
    );
};
