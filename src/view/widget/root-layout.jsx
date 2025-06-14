import { Container, CssBaseline } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { CollectionList } from "./collection-list";
import { DialogContainer } from "./dialog-container";
import { getMuiTheme } from "../../util/get-mui-theme";
import { Header } from "./header";
import { getSettingsMode } from "../../model/selectors";
import { Settings } from "./settings";
import { ThemeProvider } from "@mui/material/styles";

export const RootLayout = props => {
    const mode = useSelector(getSettingsMode);

    return (
        <Container disableGutters={true} maxWidth={false}>
            <ThemeProvider theme={getMuiTheme(mode)}>
                <div className="root-layout">
                    <CssBaseline enableColorScheme />
                    <Header {...props} />
                    <CollectionList {...props} />
                    <Settings {...props} />
                    <DialogContainer {...props} />
                </div>
            </ThemeProvider>
        </Container>
    );
};
