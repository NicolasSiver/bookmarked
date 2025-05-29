import { Paper, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { getCollections, getMode } from "../../model/selectors";

export const DialogContainer = props => {
    const collections = useSelector(getCollections);
    const mode = useSelector(getMode);

    return (
        <div className="dialog-container">
            
        </div>
    );
};
