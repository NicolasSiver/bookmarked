/**
 * ExtensionStorage class provides a unified interface for accessing
 * browser storage, supporting both Chrome's storage API and localStorage.
 * It abstracts the differences between the two environments, allowing
 * for seamless data retrieval and storage.
 * 
 * Usage:
 * const storage = new ExtensionStorage('local'); // or 'sync' for Chrome sync storage
 * @param {string} storageType - The type of storage to use ('local' or 'sync').
 * @returns {ExtensionStorage} An instance of the ExtensionStorage class.
 */
export class ExtensionStorage {
    constructor(storageType = 'local') {
        this.storageType = storageType;
    }

    getValue(keys) {
        return new Promise(resolve => {
            window.chrome.storage[this.storageType].get(keys, resolve);
        });
    }

    setValue(values) {
        return new Promise(resolve => {
            window.chrome.storage[this.storageType].set(values, resolve);
        });
    }
}
