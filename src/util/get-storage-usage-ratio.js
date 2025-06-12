/**
 * The quota limitation is approximately 100 KB (102400), 8 KB (8192) per item.
 */
export function getStorageUsageRatio(limit = 102400) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.getBytesInUse(null, bytes => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(Math.min(bytes / limit, 1));
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}
