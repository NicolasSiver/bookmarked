import { createTheme } from "@mui/material/styles";

/**
 * Creates a Material-UI theme based on the specified mode.
 * 
 * @param {String} mode "light" or "dark"
 * @returns {Object} MUI theme object
 */
export function getMuiTheme(mode = 'dark') {
    return createTheme({ colorSchemes: { [mode]: true } });
}
