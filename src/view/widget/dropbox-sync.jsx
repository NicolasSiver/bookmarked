import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import IconSend from "@mui/icons-material/Send";
import React from "react";
import { useSelector } from "react-redux";

import { getDropboxSyncCodeChallenge, getDropboxSyncCodeVerifier } from "../../model/selectors";

export const DropboxSync = props => {
    const codeChallenge = useSelector(getDropboxSyncCodeChallenge) || '';
    const codeVerifier = useSelector(getDropboxSyncCodeVerifier);

    const renderDropboxSync = () => {
        let result = null;

        if (codeVerifier !== null) {
            result = (
                <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                    <TextField
                        fullWidth
                        label="OAuth code"
                        size="small"
                        placeholder="Example: 8PNzOhLcg8..."
                        value={codeChallenge}
                        onChange={event => props.changeDropboxSyncCodeChallenge(event.target.value)} />
                    <Tooltip title="Send OAuth code to finish connecting to Dropbox">
                        <IconButton
                            onClick={() => props.finishDropboxAuth()}
                            sx={{ ml: 1 }}
                            loading={codeChallenge.length === 0}>
                            <IconSend />
                        </IconButton>
                    </Tooltip>
                </Box >
            );
        }

        return result;
    };

    return (
        <div className="dropbox-sync">
            <Button
                fullWidth
                variant="contained"
                onClick={() => props.authDropbox()}
                sx={{ mt: 1, mb: 1 }}>
                Connect to Dropbox
            </Button>
            {renderDropboxSync()}
        </div>
    );
};
