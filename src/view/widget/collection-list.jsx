import { Paper, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { CollectionItem } from "./collection-item";
import {getCollections} from "../../model/selectors";

export const CollectionList = props => {
    const collections = useSelector(getCollections);

    return (
        <div className="collection-list">
            <Stack spacing={8}>
                {getCollectionItems(collections)}
            </Stack>
        </div>
    );
};

const getCollectionItems = items => {
    return items.map(collection => {
        return (
            <div className="collection-list__item" key={collection.id}>
                <Paper elevation={2}>
                    <CollectionItem collection={collection} />
                </Paper> 
            </div>
        );
    });
};
