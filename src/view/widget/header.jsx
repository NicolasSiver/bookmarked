import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import IconMenu from "@mui/icons-material/Menu"
import IconSettings from "@mui/icons-material/Settings"
import React from "react";
import { useSelector } from "react-redux";

import * as Modes from "../../model/modes";
import { getMenuAnchorElement, getMode } from "../../model/selectors";
import { Mode } from "@mui/icons-material";

export const Header = ({ changeMode, menuDidSelect }) => {
    let anchorElement = useSelector(getMenuAnchorElement);

    const clickCallback = event => {
        menuDidSelect(event.currentTarget);
    };

    const modeCallback = () => {
        changeMode();
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
                            onClick={clickCallback}>
                            <IconMenu />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElement}
                            keepMounted
                            open={anchorElement !== null}
                            onClose={(event, reason) => { console.log(reason); }}>
                            <MenuItem onClick={() => { }}>Add collection</MenuItem>
                            <MenuItem onClick={modeCallback}>{getModeLabel()}</MenuItem>
                        </Menu>
                    </div>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Bookmarked ver. 0.0.0
                    </Typography>

                    <Tooltip title="Settings">
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="settings"
                            sx={{ ml: 2 }}>
                            <IconSettings />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </div>
    );
};
