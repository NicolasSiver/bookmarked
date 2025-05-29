import { Paper, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import * as DialogTypes from "../../model/dialog-types";
import { getDiaglogType } from "../../model/selectors";

export const DialogContainer = props => {
    const dialogType = useSelector(getDiaglogType);

    return (
        <div className="dialog-container">
            {createDialogByType(dialogType, props)}
        </div>
    );
};

const createDialogByType = (type, props) => {
    switch (type) {
        case DialogTypes.COLLECTION_NEW:
            return (
                <React.Fragment>
                    <Paper className="dialog-container__paper">
                        <Stack spacing={2}>
                            {/* Replace with actual collection new dialog component */}
                            <div>Collection New Dialog</div>
                        </Stack>
                    </Paper>
                </React.Fragment>
            );
        default:
            return null;
    }
};
