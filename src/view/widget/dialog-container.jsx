import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { DialogCollectionNew } from "../display/dialog-collection-new";
import * as DialogTypes from "../../model/dialog-types";
import { getDialogTarget, getDialogType } from "../../model/selectors";

export const DialogContainer = props => {
    const dialogType = useSelector(getDialogType);
    const dialogTarget = useSelector(getDialogTarget) || '';
    
    return (
        <div className="dialog-container">
            {createDialogByType(dialogType, dialogTarget, props)}
        </div>
    );
};

const createDialogByType = (dialogType, dialogTarget, props) => {
    switch (dialogType) {
        case DialogTypes.COLLECTION_NEW:
            return <DialogCollectionNew
                dialogContext={dialogTarget}
                {...props}/>;

        case DialogTypes.COLLECTION_DELETE_CONFIRMATION:
            return (
                <React.Fragment>
                    <Dialog
                        open={true}
                        onClose={() => undefined}
                        maxWidth="xs">
                        <DialogTitle>Delete collection</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete the collection "{collectionName}"? This action cannot be undone.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={dialogCloseCallback}>Cancel</Button>
                            <Button onClick={props.deleteCollection}>Delete</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            );
        default:
            return null;
    }
};
