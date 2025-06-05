import { Paper, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import * as Constants from "../../model/constants";
import { PopupItem } from "./popup-item";
import { getCollections, getTabUrl } from "../../model/selectors";

export const PopupList = props => {
    const collections = useSelector(getCollections);
    const tabUrl = useSelector(getTabUrl);
    const collectionCount = collections.length;
    const extensionPage = tabUrl === Constants.NEW_TAB_URL;

    const createHint = () => {
        let message;

        if (extensionPage === true) {
            message = "This is a new tab page. Switch to the tab you want to save and click the action button again.";
        } else if (collectionCount === 0) {
            message = "You have no collections yet. Please open the extension and create your first collection.";
        }           

        return (
            <div className="popup-list__hint">
                <Paper elevation={2} sx={{ px: 4, py: 2 }}>
                    {message}
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
                {collectionCount === 0 || extensionPage === true ? createHint() : getCollectionItems()}
            </Stack>
        </div>
    );
};
