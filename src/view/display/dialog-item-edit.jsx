import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { getCollectionById } from "../../model/selector/get-collection-by-id";
import { getCollectionItemsById } from "../../model/selector/get-collection-items-by-id";

export const DialogItemEdit = (props) => {
    const { collectionId, itemId } = props.dialogContext
    const collection = useSelector(getCollectionById(collectionId));
    const items = useSelector(getCollectionItemsById(collectionId));
    const itemIndex = items.findIndex(item => item.id === itemId);
    const item = items[itemIndex];

    const dialogCloseCallback = () => {
        props.closeDialog();
    };

    return (
        <React.Fragment>
            <Dialog
                open={true}
                onClose={() => undefined}
                maxWidth="xs">
                <DialogTitle>Edit: "{item.title}"</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        TODO Text
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => undefined}>Delete</Button>
                    <Button onClick={dialogCloseCallback}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
