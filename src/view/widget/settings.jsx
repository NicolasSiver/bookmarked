import { Box, Drawer, FormControl, FormLabel, InputLabel, LinearProgress, Link, MenuItem, Select, Stack, Switch, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { getVersion } from "../../util/get-version";
import { getSettingsItemWidth, getSettingsMode, getSettingsPanelOpen, getSettingsPanelStorageQuota } from "../../model/selectors";

export const Settings = (props) => {
    const settingsOpen = useSelector(getSettingsPanelOpen);
    const storageQuota = useSelector(getSettingsPanelStorageQuota);
    // Settings
    const itemWidth = useSelector(getSettingsItemWidth);
    const mode = useSelector(getSettingsMode);

    const itemWidthCallback = event => {
        props.changeItemWidth(event.target.value);
    }

    const toggleSettings = () => {
        props.toggleSettings();
    };

    const toggleTheme = event => {
        props.changeTheme(event.target.checked === true ? 'dark' : 'light');
    };

    return (
        < div className="settings">
            <Drawer
                anchor="right"
                open={settingsOpen}
                onClose={toggleSettings}>
                <div className="settings__content">
                    <Typography variant="h6" sx={{ my: 2 }}>General</Typography>
                    <FormControl component="fieldset" variant="standard">
                        <FormLabel>Theme</FormLabel>
                    </FormControl>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Typography>Light</Typography>
                        <Switch
                            checked={mode === 'dark'}
                            onChange={toggleTheme} />
                        <Typography>Dark</Typography>
                    </Stack>

                    <Typography variant="h6" sx={{ my: 2 }}>View</Typography>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="item-width-label">Item width</InputLabel>
                        <Select
                            labelId="item-width-label"
                            id="itemWidth"
                            value={itemWidth}
                            label="Item width"
                            onChange={itemWidthCallback}>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography variant="h6" sx={{ my: 2 }}>Other</Typography>
                    <p>Storage usage: <span className="settings__content-value">{Number(storageQuota).toFixed(1)}%</span></p>
                    <LinearProgress variant="determinate" value={storageQuota} />

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
                        <div>Version: <span className="settings__content-value">{getVersion()}</span></div>
                        <Link href="https://github.com/NicolasSiver/bookmarked/releases" sx={{ px: '1rem' }}>Changelog</Link>
                    </Box>
                </div>
            </Drawer>
        </div>
    );
};
