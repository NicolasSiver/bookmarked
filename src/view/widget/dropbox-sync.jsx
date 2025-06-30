import { Box, Button, IconButton, TextField } from "@mui/material";
import IconCheck from "@mui/icons-material/CheckCircle";
import React from "react";
import { useSelector } from "react-redux";

import { getDropboxSyncCodeVerifier } from "../../model/selectors";

export const DropboxSync = props => {
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
                        placeholder="Example: 4/0AY0e-g5..."
                        onChange={event => undefined} />
                    <IconButton onClick={() => undefined} sx={{ ml: 1 }} loading={true}>
                        <IconCheck />
                    </IconButton>
                </Box>
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
