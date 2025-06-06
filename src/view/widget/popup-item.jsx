import { Box, IconButton, Typography } from "@mui/material";
import IconAdd from "@mui/icons-material/Add";
import IconCheck from "@mui/icons-material/Check";
import React from "react";
import { useSelector } from "react-redux";

import { getCollectionItemsById } from "../../model/selector/get-collection-items-by-id";
import { getTabUrl } from "../../model/selectors";

export const PopupItem = ({ addItem, collection, index, total }) => {
    const items = useSelector(getCollectionItemsById(collection.id)) || [];
    const tabUrl = useSelector(getTabUrl);
    const included = items.some(item => item.url === tabUrl);

    const renderLabel = () => {
        return (
            <Typography variant="body1" component="div" sx={{ m: 1 }}>
                {collection.name}
            </Typography>
        );
    };

    return (
        <div className="popup-item">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {renderLabel()}

                <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="add"
                    disabled={included}
                    sx={{ mx: 0.5 }}
                    onClick={() => addItem(collection.id)}>
                    {included === true ? <IconCheck fontSize="small" /> : <IconAdd fontSize="small" />}
                </IconButton>
            </Box>
        </div>
    );
};
