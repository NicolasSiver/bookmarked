export function getVersion() {
    let version = '0.0.0';

    if (window.chrome !== undefined && window.chrome.runtime !== undefined) {
        version = window.chrome.runtime.getManifest().version;
    }

    return version;
}
