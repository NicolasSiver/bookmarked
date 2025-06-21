import { Container, CssBaseline } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";

import { CollectionList } from "./collection-list";
import { DialogContainer } from "./dialog-container";
import { getMuiTheme } from "../../util/get-mui-theme";
import { Header } from "./header";
import { SearchPanel } from "./search-panel";
import { getSearchResults, getSettingsMode } from "../../model/selectors";
import { Settings } from "./settings";

export const RootLayout = props => {
    const mode = useSelector(getSettingsMode);
    const searchResults = useSelector(getSearchResults);

    return (
        <Container disableGutters={true} maxWidth={false}>
            <ThemeProvider theme={getMuiTheme(mode)}>
                <div className="root-layout">
                    <CssBaseline enableColorScheme />
                    <Header {...props} />
                    {(searchResults === null) ? <CollectionList {...props} /> : <SearchPanel {...props} />}
                    <Settings {...props} />
                    <DialogContainer {...props} />
                </div>
            </ThemeProvider>
        </Container>
    );
};
