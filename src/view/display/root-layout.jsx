import { Container, CssBaseline } from "@mui/material";
import React from "react";

import { CollectionList } from "../widget/collection-list";
import { DialogContainer } from "../widget/dialog-container";
import { Header } from "../widget/header";
import { Settings } from "../widget/settings";

export const RootLayout = props => {

    return (
        <Container disableGutters={true} maxWidth={false}>
            <div className="root-layout">
                <CssBaseline enableColorScheme />
                <Header {...props} />
                <CollectionList {...props} />
                <Settings {...props} />
                <DialogContainer {...props} />
            </div>
        </Container>
    );
};
