import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";

export const DialogCollectionNew = (props) => {
    const dialogTargetCallback = event => {
        props.changeDialogTarget(event.target.value);
    };

    const collectionCreateCallback = () => {
        props.createCollection();
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
                <DialogTitle>Create collection</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a name for the new collection. By default, the collection will be added to the end of the list.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Collection name"
                        fullWidth
                        value={props.dialogContext}
                        onChange={dialogTargetCallback} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogCloseCallback}>Cancel</Button>
                    <Button onClick={collectionCreateCallback}>Create</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
