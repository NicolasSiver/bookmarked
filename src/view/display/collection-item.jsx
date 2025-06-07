import { Alert, Button, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import IconArrowDownward from "@mui/icons-material/ArrowDownward";
import IconArrowUpward from "@mui/icons-material/ArrowUpward";
import IconDelete from "@mui/icons-material/DeleteOutline";
import React from "react";
import { useSelector } from "react-redux";

import * as Constants from "../../model/constants";
import { getCollectionItemsById } from "../../model/selector/get-collection-items-by-id";
import * as Modes from "../../model/modes";
import { truncateForEllipsis } from "../../util/truncate-for-ellipsis";

export const CollectionItem = ({ changeCollectionName, collection, collectionWillDelete, editCollectionItem, mode, index, itemDidClick, total, shiftCollection }) => {
    const items = useSelector(getCollectionItemsById(collection.id)) || [];

    const itemEditCallback = itemId => {
        editCollectionItem(collection.id, itemId);
    };

    const renderItem = item => {
        let clickCallback = mode === Modes.EDIT ? () => itemEditCallback(item.id) : () => itemDidClick(item);

        // TODO: Replace buttons with something more flexible, like a link or a card

        return (
            <Grid key={item.id} size={3}>
                <Tooltip title={item.description} placement="top">
                    <Button
                        fullWidth
                        onClick={clickCallback}
                        startIcon={<img src={item.favIconUrl} style={{ width: 16, height: 16 }} />}
                        variant="outlined">
                        {truncateForEllipsis(item.title, Constants.MAX_ITEM_TITLE_LENGTH)}
                    </Button>
                </Tooltip>
            </Grid>
        );
    };

    const renderItems = () => {
        let container = null;

        if (items.length > 0) {
            container = (
                <Grid container spacing={2}>
                    {items.map(item => renderItem(item))}
                </Grid>
            );
        } else {
            container = (
                <div className="collection-item__alert">
                    <Alert severity="info" variant="outlined">
                        When you add your first bookmark, it will show up here.
                    </Alert>
                </div>
            );
        }

        return container;
    };

    const renderTitle = () => {
        let title = null;

        if (mode === Modes.EDIT) {
            title = (
                <div className="collection-item__title">
                    <TextField
                        label="Collection name"
                        defaultValue={collection.name}
                        sx={{ my: 1 }}
                        onChange={event => changeCollectionName(collection.id, event.target.value)} />

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="up"
                        disabled={index === 0}
                        sx={{ mx: 0.5 }}
                        onClick={() => shiftCollection(index, index - 1)}>
                        <IconArrowUpward />
                    </IconButton>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="down"
                        disabled={index === total - 1}
                        sx={{ mx: 0.5 }}
                        onClick={() => shiftCollection(index, index + 1)}>
                        <IconArrowDownward />
                    </IconButton>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="delete"
                        sx={{ mx: 0.5 }}
                        onClick={() => collectionWillDelete(collection.id)}>
                        <IconDelete />
                    </IconButton>
                </div>
            );
        } else if (mode === Modes.VIEW) {
            title = (
                <Typography variant="h5" component="div" sx={{ m: 1 }}>
                    {collection.name}
                </Typography>
            );
        }

        return title;
    };

    return (
        <div className="collection-item">
            {renderTitle()}
            {renderItems()}
        </div>
    );
};
