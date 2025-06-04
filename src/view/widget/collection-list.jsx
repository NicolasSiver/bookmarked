import { Paper, Stack } from "@mui/material";
import IconMenu from "@mui/icons-material/Menu";
import React from "react";
import { useSelector } from "react-redux";

import { CollectionItem } from "../display/collection-item";
import { getCollections, getMode } from "../../model/selectors";

export const CollectionList = props => {
    const collections = useSelector(getCollections);
    const mode = useSelector(getMode);
    const collectionCount = collections.length;

    const createHint = () => {
        return (
            <div className="collection-list__hint">
                <Paper elevation={2} sx={{ px: 4, py: 2 }}>
                    Create your first collection. Click the <IconMenu /> button to create a new collection.
                </Paper>
            </div>
        );
    };

    const getCollectionItems = () => {
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
                {collectionCount === 0 ? createHint() : getCollectionItems()}
            </Stack>
        </div>
    );
};
