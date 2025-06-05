import { Container, CssBaseline } from "@mui/material";
import React from "react";

import { CollectionList } from "../widget/collection-list";

export const PopupLayout = props => {

    return (
        <Container disableGutters={true} maxWidth={false}>
            <div className="popup-layout">
                <CssBaseline enableColorScheme />
                <CollectionList {...props} />
            </div>
        </Container>
    );
};
