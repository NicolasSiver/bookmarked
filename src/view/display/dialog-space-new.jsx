import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";

export const DialogSpaceNew = (props) => {
    const dialogTargetCallback = event => {
        props.changeDialogTarget(event.target.value);
    };

    const spaceCreateCallback = () => {
        props.createSpace();
    };

    const dialogCloseCallback = () => {
        props.closeDialog();
    };

    return (
        <React.Fragment>
            <Dialog
                open={true}
                onClose={() => undefined}
                maxWidth="xs">
                <DialogTitle>Create space</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a name for the new space. Spaces are used to group collections together. For example, you can create a space for work-related collections and another for personal collections.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Space name"
                        fullWidth
                        value={props.dialogContext}
                        onChange={dialogTargetCallback}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                spaceCreateCallback();
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogCloseCallback}>Cancel</Button>
                    <Button onClick={spaceCreateCallback}>Create</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
