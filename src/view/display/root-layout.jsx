import {Container, CssBaseline} from "@mui/material";
import React from "react";

import { Header } from "../widget/header";

export const RootLayout = () => {
    return (
        <Container disableGutters={true}>
            <div className="root-layout">
                <CssBaseline enableColorScheme />
                <Header />
            </div>
        </Container>
    );
};
