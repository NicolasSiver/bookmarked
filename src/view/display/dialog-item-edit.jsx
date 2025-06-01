import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { getCollectionById } from "../../model/selector/get-collection-by-id";
import { getCollectionItemsById } from "../../model/selector/get-collection-items-by-id";
import { getCollections } from "../../model/selectors";

export const DialogItemEdit = (props) => {
    const { collectionId, itemId } = props.dialogContext
    const collection = useSelector(getCollectionById(collectionId));
    const collections = useSelector(getCollections);
    const items = useSelector(getCollectionItemsById(collectionId));
    const itemIndex = items.findIndex(item => item.id === itemId);
    const item = items[itemIndex];

    const dialogCloseCallback = () => {
        props.closeDialog();
    };

    // TODO Consider to move Delete button to the bottom of the dialog to the dedicated section

    const createCollectionSelect = () => {
        return (
            <FormControl fullWidth margin="dense">
                <InputLabel id="collection-select-label">Parent collection</InputLabel>
                <Select
                    labelId="collection-select-label"
                    value={collectionId}
                    label="Parent collection"
                    onChange={() => undefined}>
                    {collections.map(collection => (
                        <MenuItem key={collection.id} value={collection.id}>
                            {collection.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
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
                        TODO Text?
                    </DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={item.title}
                        onChange={() => undefined} />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        value={item.description}
                        onChange={() => undefined} />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="URL"
                        fullWidth
                        type="url"
                        value={item.url}
                        onChange={() => undefined} />
                    {createCollectionSelect()}
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={() => undefined}>Delete</Button>
                    <Button onClick={dialogCloseCallback}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
