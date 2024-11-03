/**
 * Extracts Google Chrome Extension manifest in the Google Chrome environment.
 * 
 * @returns {Object}
 */
export function getManifest() {
    let manifest = null;

    if (window.chrome !== undefined && window.chrome.runtime !== undefined) {
        manifest = window.chrome.runtime.getManifest();
    }

    return manifest;
}
