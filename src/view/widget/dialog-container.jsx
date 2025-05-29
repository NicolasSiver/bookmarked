import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import * as DialogTypes from "../../model/dialog-types";
import { getDialogTarget, getDialogType } from "../../model/selectors";

export const DialogContainer = props => {
    const dialogType = useSelector(getDialogType);
    const collectionName = useSelector(getDialogTarget) || '';

    const collectionNameCallback = event => {
        props.changeDialogTarget(event.target.value);
    };

    return (
        <div className="dialog-container">
            {createDialogByType(dialogType, props, collectionName, collectionNameCallback)}
        </div>
    );
};

const createDialogByType = (type, props, collectionName, collectionNameCallback) => {
    switch (type) {
        case DialogTypes.COLLECTION_NEW:
            return (
                <React.Fragment>
                    <Dialog
                        open={true}
                        onClose={() => undefined}
                        maxWidth="xs">
                            <DialogTitle>Create Collection</DialogTitle>
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
                                    value={collectionName}
                                    onChange={collectionNameCallback}/>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => undefined}>Cancel</Button>
                                <Button onClick={() => undefined}>Create</Button>
                            </DialogActions>
                    </Dialog>
                </React.Fragment>
            );
        default:
            return null;
    }
};
