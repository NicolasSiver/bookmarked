import { Paper, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { PopupItem } from "./popup-item";
import { getCollections } from "../../model/selectors";

export const PopupList = props => {
    const collections = useSelector(getCollections);
    const collectionCount = collections.length;

    const createHint = () => {
        return (
            <div className="popup-list__hint">
                <Paper elevation={2} sx={{ px: 4, py: 2 }}>
                    Please open the extension and create your first collection.
                </Paper>
            </div>
        );
    };

    const getCollectionItems = () => {
        return collections.map((collection, index) => {
            return (
                <div className="collection-list__item" key={collection.id}>
                    <Paper elevation={2}>
                        <PopupItem
                            collection={collection}
                            index={index}
                            total={collectionCount}
                            {...props} />
                    </Paper>
                </div>
            );
        });
    };

    return (
        <div className="popup-list">
            <Stack spacing={2} sx={{ px: 2, py: 1 }}>
                {collectionCount === 0 ? createHint() : getCollectionItems()}
            </Stack>
        </div>
    );
};
