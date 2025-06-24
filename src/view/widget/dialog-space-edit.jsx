import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputLabel, MenuItem, Stack, TextField } from "@mui/material";
import IconArrowDownward from "@mui/icons-material/ArrowDownward";
import IconArrowUpward from "@mui/icons-material/ArrowUpward";
import IconDelete from "@mui/icons-material/DeleteOutline";
import React from "react";
import { useSelector } from "react-redux";

import { getSpacesCurrent, getSpacesList } from "../../model/selectors";

export const DialogSpaceEdit = props => {
    const spacesList = useSelector(getSpacesList);
    const currentSpace = useSelector(getSpacesCurrent);

    const dialogCloseCallback = () => {
        props.closeDialog();
    };

    const renderSpaces = () => {
        let total = spacesList.length;

        return spacesList.map((space, index) => (
            <Box key={space.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField
                    focused={space.id === currentSpace}
                    margin="dense"
                    label="Space name"
                    fullWidth
                    value={space.name}
                    onChange={e => undefined} />

                <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="up"
                    disabled={index === 0}
                    sx={{ mx: 0.5 }}
                    onClick={() => shiftCollection(index, index - 1)}>
                    <IconArrowUpward />
                </IconButton>

                <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="down"
                    disabled={index === total - 1}
                    sx={{ mx: 0.5 }}
                    onClick={() => shiftCollection(index, index + 1)}>
                    <IconArrowDownward />
                </IconButton>

                <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="delete"
                    disabled={currentSpace === space.id}
                    sx={{ mx: 0.5 }}
                    onClick={() => collectionWillDelete(collection.id)}>
                    <IconDelete />
                </IconButton>
            </Box>

        ));
    };

    return (
        <React.Fragment>
            <Dialog
                open={true}
                onClose={() => undefined}
                maxWidth="xs">
                <DialogTitle>Edit spaces</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Change the name of the space, change the order of the spaces, or delete a space.
                    </DialogContentText>
                    <Stack spacing={1} sx={{ mt: 2 }}>
                        {renderSpaces()}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogCloseCallback}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
