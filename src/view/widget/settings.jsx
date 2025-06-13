import { Box, Drawer, FormControl, FormControlLabel, FormLabel, LinearProgress, Link, Stack, Switch, Typography } from "@mui/material";
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <div>Version: <span className="settings__content-value">{getVersion()}</span></div>
                        <Link href="https://github.com/NicolasSiver/bookmarked/releases" sx={{ px: '1rem' }}>Changelog</Link>
                    </Box>
                    <p>Storage usage: <span className="settings__content-value">{Number(storageQuota).toFixed(1)}%</span></p>
                    <LinearProgress variant="determinate" value={storageQuota} />
                    <Typography variant="h6" sx={{ my: 2 }}>General</Typography>
                    <FormControl component="fieldset" variant="standard">
                        <FormLabel>Theme</FormLabel>
                    </FormControl>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Typography>Light</Typography>
                        <Switch />
                        <Typography>Dark</Typography>
                    </Stack>
                    <Typography variant="h6" sx={{ my: 2 }}>View</Typography>
                    TODO
                </div>
            </Drawer>
        </div>
    );
};
