import { Paper, Stack } from "@mui/material";
import IconMenu from "@mui/icons-material/Menu";
import React from "react";
import { useSelector } from "react-redux";

import { CollectionItem } from "./collection-item";
import { getCollections, getMode, getSpacesCurrent, getSpacesList } from "../../model/selectors";

export const CollectionList = props => {
    const collections = useSelector(getCollections);
    const mode = useSelector(getMode);
    const spacesCurrent = useSelector(getSpacesCurrent);
    const spacesList = useSelector(getSpacesList);
    const collectionCount = collections.length;

    const createHint = () => {
        return (
            <div className="collection-list__hint">
                <Paper elevation={2} sx={{ px: 4, py: 2 }}>
                    Create your first collection. Click the <IconMenu sx={{ verticalAlign: 'bottom' }} /> button to create a new collection.
                </Paper>
            </div>
        );
    };

    const getCollectionItems = () => {
        let collectionsInSpace, spaceCollections;
        let currentSpace = spacesCurrent !== null ? spacesList.find(space => space.id === spacesCurrent) : null;

        if (currentSpace === null) {
            // Render all collections
            spaceCollections = collections;
        } else {
            // Render only collections assigned to the current space and those not assigned to any space
            collectionsInSpace = [];
            spaceCollections = [];

            // Build list of all collections assigned to any space
            spacesList.forEach(space => {
                collectionsInSpace = collectionsInSpace.concat(space.collections);
            });

            collections.forEach((collection, index) => {
                if (currentSpace.collections.includes(collection.id) || collectionsInSpace.includes(collection.id) === false) {
                    // Create sparse array to keep the index of the collection
                    spaceCollections[index] = collection;
                }
            });
        }

        return spaceCollections.map((collection, index) => {
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
