import { AppBar, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import IconMenu from "@mui/icons-material/Menu";
import IconSettings from "@mui/icons-material/Settings";
import React from "react";
import { useSelector } from "react-redux";

import * as DialogTypes from "../../model/dialog-types";
import * as Modes from "../../model/modes";
import { SearchBar } from "./search-bar";
import { getMenuAnchorElement, getMode } from "../../model/selectors";
import { SpaceSelector } from "./space-selector";

export const Header = (props) => {
    let anchorElement = useSelector(getMenuAnchorElement);

    const collectionDialogCallback = () => {
        props.openDialog(DialogTypes.COLLECTION_NEW, null);
    };

    const menuCallback = event => {
        props.menuDidSelect(event.currentTarget);
    };

    const menuCloseCallback = (event, reason) => {
        // TODO Utilize "reason" to determine if the menu should be closed
        props.menuDidSelect(null);
    };

    const modeCallback = () => {
        props.changeMode();
    };

    const settingsCallback = () => {
        props.openSettings();
    };

    const spaceDialogCallback = () => {
        props.openDialog(DialogTypes.SPACE_NEW, null);
    };

    const getModeLabel = () => {
        let label = null;
        let mode = useSelector(getMode);

        switch (mode) {
            case Modes.VIEW:
                label = `Switch to "Edit" mode`;
                break;
            case Modes.EDIT:
                label = `Switch to "View" mode`;
                break;
            default:
                label = "Unknown mode";
        }

        return label;
    }

    return (
        <div className="header">
            <AppBar position="sticky">
                <Toolbar>
                    <div>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={menuCallback}>
                            <IconMenu />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElement}
                            keepMounted
                            open={anchorElement !== null}
                            onClose={menuCloseCallback}>
                            <MenuItem onClick={collectionDialogCallback}>Add collection</MenuItem>
                            <MenuItem onClick={spaceDialogCallback}>Add space</MenuItem>
                            <MenuItem onClick={modeCallback}>{getModeLabel()}</MenuItem>
                        </Menu>
                    </div>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Bookmarked
                    </Typography>

                    <SpaceSelector {...props} />

                    <SearchBar {...props}/>

                    <Tooltip title="Settings">
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="settings"
                            sx={{ ml: 2 }}
                            onClick={settingsCallback}>
                            <IconSettings />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </div>
    );
};
