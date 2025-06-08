/**
 * The quota limitation is approximately 100 KB, 8 KB per item.
 */
export function getStorageUsageRatio(limit = 100000) {
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
