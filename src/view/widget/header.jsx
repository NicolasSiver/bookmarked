import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import IconMenu from "@mui/icons-material/Menu"
import IconSettings from "@mui/icons-material/Settings"
import React from "react";
import { useSelector } from "react-redux";

import { getMenuAnchorElement } from "../../model/selectors";

export const Header = ({ menuDidSelect }) => {
    let anchorElement = useSelector(getMenuAnchorElement);

    const clickCallback = event => {
        menuDidSelect(event.currentTarget);
    };

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
                            <MenuItem onClick={() => { }}>View mode</MenuItem>
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
