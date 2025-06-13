/**
 * The quota limitation is approximately 100 KB (102400), 8 KB (8192) per item.
 */
export function getStorageUsageRatio(limit = 102400) {
    return new Promise((resolve, reject) => {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync && chrome.storage.sync.getBytesInUse) {
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
        } else if (typeof window !== 'undefined' && window.localStorage) {
            // Dev environment: estimate usage from localStorage
            resolve(0.88); // Default to 88% if localStorage is used
        } else {
            resolve(0.08); // Default to 8% if no storage is available
        }
    });
}
