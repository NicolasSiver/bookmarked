import { Container, CssBaseline } from "@mui/material";
import React from "react";

import { CollectionList } from "../widget/collection-list";
import { Header } from "../widget/header";

export const RootLayout = () => {
    return (
        <Container disableGutters={true} maxWidth={false}>
            <div className="root-layout">
                <CssBaseline enableColorScheme />
                <Header />
                <CollectionList />
            </div>
        </Container>
    );
};
