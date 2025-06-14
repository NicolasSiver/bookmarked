import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { getMuiTheme } from "../../util/get-mui-theme";
import { PopupList } from "../widget/popup-list";
import { getSettingsMode } from "../../model/selectors";

export const PopupLayout = props => {
    const mode = useSelector(getSettingsMode);

    return (
        <Container disableGutters={true} maxWidth={false}>
            <ThemeProvider theme={getMuiTheme(mode)}>
                <div className="popup-layout">
                    <CssBaseline enableColorScheme />
                    <PopupList {...props} />
                </div>
            </ThemeProvider>
        </Container>
    );
};
