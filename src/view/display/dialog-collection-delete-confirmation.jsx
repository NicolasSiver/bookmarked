import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { getCollectionById } from "../../model/selector/get-collection-by-id";

export const DialogCollectionDeleteConfirmation = (props) => {
    const collection = useSelector(getCollectionById(props.dialogContext));

    console.log(collection)

    const dialogCloseCallback = () => {
        props.closeDialog();
    };

    return (
        <React.Fragment>
            <Dialog
                open={true}
                onClose={() => undefined}
                maxWidth="xs">
                <DialogTitle>Delete collection: "{collection.name}"</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the collection "{collection.name}"? This action cannot be undone. All items in this collection will be permanently deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogCloseCallback}>Cancel</Button>
                    <Button onClick={() => undefined}>Delete</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
