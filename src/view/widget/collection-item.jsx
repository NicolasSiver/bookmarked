import { Alert, Box, Button, Chip, Grid, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import IconArrowDownward from "@mui/icons-material/ArrowDownward";
import IconArrowUpward from "@mui/icons-material/ArrowUpward";
import IconDelete from "@mui/icons-material/DeleteOutline";
import React from "react";
import { useSelector } from "react-redux";

import { CollectionSpaceSelector } from "./collection-space-selector";
import { getCollectionItemsById } from "../../model/selector/get-collection-items-by-id";
import { Bookmark } from "../display/bookmark";
import * as Modes from "../../model/modes";
import { getSettingsItemWidth, getSpacesList } from "../../model/selectors";

export const CollectionItem = ({ changeCollectionName, changeCollectionSpaces, collection, collectionWillDelete, editCollectionItem, mode, index, itemDidClick, total, shiftCollection }) => {
    const items = useSelector(getCollectionItemsById(collection.id)) || [];
    const itemWidth = useSelector(getSettingsItemWidth);
    const spacesList = useSelector(getSpacesList);

    const collectionSpacesCallback = (collectionId, spaceIds) => {
        changeCollectionSpaces(collectionId, spaceIds);
    };

    const itemEditCallback = itemId => {
        editCollectionItem(collection.id, itemId);
    };

    const renderItem = item => {
        let clickCallback = mode === Modes.EDIT ? () => itemEditCallback(item.id) : () => itemDidClick(item);

        return (
            <Grid key={item.id} size={itemWidth}>
                <Bookmark
                    item={item}
                    clickHandler={clickCallback} />
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

    const renderSpaces = () => {
        let result = null;
        let spaces = spacesList.filter(space => space.collections.includes(collection.id));

        if (spaces.length > 0) {
            result = (
                <Stack direction="row" spacing={1} sx={{ ml: 2, flexWrap: 'wrap' }}>
                    {spaces.map(space => (
                        <Chip key={space.id} label={space.name} variant="outlined" />
                    ))}
                </Stack>
            );
        }

        return result;
    };

    const renderTitle = () => {
        let title = null;

        if (mode === Modes.EDIT) {
            title = (
                <div className="collection-item__title">
                    <TextField
                        label="Collection name"
                        value={collection.name}
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

                    {spacesList.length > 0 ? <CollectionSpaceSelector changeCollectionSpaces={collectionSpacesCallback} collection={collection} spaces={spacesList} /> : null}
                </div>
            );
        } else if (mode === Modes.VIEW) {
            title = (
                <Box className="collection-item__title" sx={{ display: 'flex', alignItems: 'center'}}>
                    <Typography variant="h5" component="div" sx={{ m: 1, fontWeight: 300 }}>
                        {collection.name}
                    </Typography>
                    {renderSpaces()}
                </Box>

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
