import { Alert, Button, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import IconArrowDownward from "@mui/icons-material/ArrowDownward";
import IconArrowUpward from "@mui/icons-material/ArrowUpward";
import React from "react";
import { useSelector } from "react-redux";

import { getCollectionItemsById } from "../../model/selector/get-collection-items-by-id";
import * as Modes from "../../model/modes";

export const CollectionItem = ({ collection, mode, index, total }) => {
    const items = useSelector(getCollectionItemsById(collection.id)) || [];

    return (
        <div className="collection-item">
            {renderTitle(collection, mode, index, total)}
            {renderItems(items)}
        </div>
    );
};

const renderItem = item => {
    return (
        <Grid key={item.id} size={1}>
            <Tooltip title={item.description} placement="top">
                <Button variant="outlined">{item.title}</Button>
            </Tooltip>
        </Grid>
    );
};

const renderItems = items => {
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

const renderTitle = (collection, mode, index, total) => {
    let title = null;

    if (mode === "edit") {
        title = (
            <div>
                <TextField
                    label="Collection name"
                    defaultValue={collection.name}
                    sx={{ my: 1 }} />

                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="up"
                    disabled={index === 0}
                    sx={{ mx: 0.5 }}
                    onClick={() => { }}>
                    <IconArrowUpward />
                </IconButton>

                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="up"
                    disabled={index === total - 1}
                    sx={{ mx: 0.5 }}
                    onClick={() => { }}>
                    <IconArrowDownward />
                </IconButton>
            </div>
        );
    } else if (mode === "view") {
        title = (
            <Typography variant="h5" component="div" sx={{ m: 1 }}>
                {collection.name}
            </Typography>
        );
    }

    return title;
};
