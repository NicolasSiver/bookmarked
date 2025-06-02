import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { getCollectionById } from "../../model/selector/get-collection-by-id";
import { getCollectionItemsById } from "../../model/selector/get-collection-items-by-id";
import * as ItemProperties from "../../model/item-properties";
import { getCollections } from "../../model/selectors";

export const DialogItemEdit = props => {
    const { collectionId, itemId } = props.dialogContext
    const collection = useSelector(getCollectionById(collectionId));
    const collections = useSelector(getCollections);
    const items = useSelector(getCollectionItemsById(collectionId));
    const itemIndex = items.findIndex(item => item.id === itemId);
    const item = items[itemIndex];

    const dialogCloseCallback = () => {
        props.closeDialog();
    };

    const editItemProperty = (property, value) => {
        props.editItemProperty(collectionId, itemId, property, value);
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

    const createOrderSelect = () => {
        let orderList = items.slice();
        // Remove the current item from the list
        orderList.splice(itemIndex, 1);
        orderList.unshift({ id: "customIndex", title: `"First item in the collection"` });

        return (
            <FormControl fullWidth margin="dense">
                <InputLabel id="order-select-label">Order</InputLabel>
                <Select
                    labelId="order-select-label"
                    value={itemIndex}
                    label="Order"
                    onChange={() => undefined}>
                    {orderList.map((item, index) => (
                        <MenuItem key={item.id} value={index}>
                            {item.title}
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
                    <TextField
                        required
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={item.title}
                        onChange={e => editItemProperty(ItemProperties.TITLE, e.target.value)} />
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
                    <DialogContentText>
                        Change order of the item in the collection. Select the item after which the current item should be placed.
                    </DialogContentText>
                    {createOrderSelect()}
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={() => undefined}>Delete</Button>
                    <Button onClick={dialogCloseCallback}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
