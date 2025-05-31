import { Alert, Button, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import IconArrowDownward from "@mui/icons-material/ArrowDownward";
import IconArrowUpward from "@mui/icons-material/ArrowUpward";
import IconDelete from "@mui/icons-material/DeleteOutline";
import React from "react";
import { useSelector } from "react-redux";

import { getCollectionItemsById } from "../../model/selector/get-collection-items-by-id";
import * as Modes from "../../model/modes";

export const CollectionItem = ({ changeCollectionName, collection, collectionWillDelete, editCollectionItem, mode, index, total, shiftCollection }) => {
    const items = useSelector(getCollectionItemsById(collection.id)) || [];

    const itemEditCallback = itemId => {
        editCollectionItem(collection.id, itemId);
    };

    return (
        <div className="collection-item">
            {renderTitle(collection, mode, index, total, shiftCollection, changeCollectionName, collectionWillDelete)}
            {renderItems(items, mode, itemEditCallback)}
        </div>
    );
};

const renderItem = (item, mode, itemEditCallback) => {
    let clickCallback = mode === Modes.EDIT ? () => itemEditCallback(item.id) : undefined;

    return (
        <Grid key={item.id} size={1}>
            <Tooltip title={item.description} placement="top">
                <Button
                    onClick={clickCallback}
                    variant="outlined">
                    {item.title}
                </Button>
            </Tooltip>
        </Grid>
    );
};

const renderItems = (items, mode, itemEditCallback) => {
    let container = null;

    if (items.length > 0) {
        container = (
            <Grid container spacing={2}>
                {items.map(item => renderItem(item, mode, itemEditCallback))}
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

const renderTitle = (collection, mode, index, total, shiftCollection, changeName, collectionWillDelete) => {
    let title = null;

    if (mode === Modes.EDIT) {
        title = (
            <div>
                <TextField
                    label="Collection name"
                    defaultValue={collection.name}
                    sx={{ my: 1 }}
                    onChange={event => changeName(collection.id, event.target.value)} />

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
