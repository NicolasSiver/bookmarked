import { Paper, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { CollectionItem } from "../display/collection-item";
import { getCollections, getMode } from "../../model/selectors";

export const CollectionList = props => {
    const collections = useSelector(getCollections);
    const mode = useSelector(getMode);

    const getCollectionItems = () => {
        let collectionCount = collections.length;

        return collections.map((collection, index) => {
            return (
                <div className="collection-list__item" key={collection.id}>
                    <Paper elevation={2}>
                        <CollectionItem
                            collection={collection}
                            index={index}
                            mode={mode}
                            total={collectionCount}
                            {...props} />
                    </Paper>
                </div>
            );
        });
    };

    return (
        <div className="collection-list">
            <Stack spacing={3} sx={{ px: 2, py: 1 }}>
                {getCollectionItems()}
            </Stack>
        </div>
    );
};
