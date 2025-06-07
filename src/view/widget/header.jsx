import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import IconMenu from "@mui/icons-material/Menu";
import IconSettings from "@mui/icons-material/Settings";
import React from "react";
import { useSelector } from "react-redux";

import * as DialogTypes from "../../model/dialog-types";
import { getVersion } from "../../util/get-version";
import * as Modes from "../../model/modes";
import { getMenuAnchorElement, getMode } from "../../model/selectors";

export const Header = ({ changeMode, menuDidSelect, openDialog, openSettings }) => {
    let anchorElement = useSelector(getMenuAnchorElement);

    const collectionDialogCallback = () => {
        openDialog(DialogTypes.COLLECTION_NEW, null);
    };

    const menuCallback = event => {
        menuDidSelect(event.currentTarget);
    };

    const menuCloseCallback = (event, reason) => {
        // TODO Utilize "reason" to determine if the menu should be closed
        menuDidSelect(null);
    };

    const modeCallback = () => {
        changeMode();
    };

    const settingsCallback = () => {
        openSettings();
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

    // TODO: Move version to the settings drawer?

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
                            <MenuItem onClick={modeCallback}>{getModeLabel()}</MenuItem>
                        </Menu>
                    </div>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Bookmarked ver. {getVersion()}
                    </Typography>

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
