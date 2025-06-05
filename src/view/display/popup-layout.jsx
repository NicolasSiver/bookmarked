import { Container, CssBaseline } from "@mui/material";
import React from "react";

import { PopupList } from "../widget/popup-list";

export const PopupLayout = props => {

    return (
        <Container disableGutters={true} maxWidth={false}>
            <div className="popup-layout">
                <CssBaseline enableColorScheme />
                <PopupList {...props} />
            </div>
        </Container>
    );
};
