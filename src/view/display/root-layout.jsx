import {Container, CssBaseline} from "@mui/material";
import React from "react";

export const RootLayout = () => {
    return (
        <Container disableGutters={true}>
            <div className="root-layout">
                <CssBaseline enableColorScheme />
            </div>
        </Container>
    );
};
