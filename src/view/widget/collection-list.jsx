import { Paper, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { CollectionItem } from "../display/collection-item";
import { getCollections, getMode } from "../../model/selectors";

export const CollectionList = props => {
    const collections = useSelector(getCollections);
    const mode = useSelector(getMode);

    return (
        <div className="collection-list">
            <Stack spacing={3} sx={{ px: 2, py: 1 }}>
                {getCollectionItems(collections, mode)}
            </Stack>
        </div>
    );
};

const getCollectionItems = (items, mode) => {
    return items.map(collection => {
        return (
            <div className="collection-list__item" key={collection.id}>
                <Paper elevation={2}>
                    <CollectionItem collection={collection} mode={mode}/>
                </Paper>
            </div>
        );
    });
};
