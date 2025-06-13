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
        this.isChromeEnvironment = window.chrome !== undefined &&
            window.chrome.storage !== undefined &&
            window.chrome.storage[this.storageType] !== undefined;
    }

    getValue(keys) {
        let data;

        if (this.isChromeEnvironment === true) {
            return new Promise((resolve) => {
                window.chrome.storage[this.storageType].get(keys, resolve);
            });
        } else {
            // FIXME: For local development change for Keys as Array
            // data = localStorage.getItem(key);
            // return Promise.resolve(data !== null ? JSON.parse(data) : undefined);
        }
    }

    setValue(values) {
        if (this.isChromeEnvironment === true) {
            return new Promise((resolve) => {
                window.chrome.storage[this.storageType].set(values, resolve);
            });
        } else {
            // FIXME: For local development adjust ot use with object for values
            // localStorage.setItem(key, JSON.stringify(value));
            return Promise.resolve();
        }
    }
}
