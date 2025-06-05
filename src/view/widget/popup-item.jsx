import { Box, IconButton, Typography } from "@mui/material";
import IconAdd from "@mui/icons-material/Add";
import React from "react";
import { useSelector } from "react-redux";

import { getCollectionItemsById } from "../../model/selector/get-collection-items-by-id";

export const PopupItem = ({ collection, index, total }) => {
    const items = useSelector(getCollectionItemsById(collection.id)) || [];

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
                    disabled={false}
                    sx={{ mx: 0.5 }}
                    onClick={() => undefined}>
                    <IconAdd fontSize="small" />
                </IconButton>
            </Box>
        </div>
    );
};
