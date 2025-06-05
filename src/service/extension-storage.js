/**
 * ExtensionStorage class provides a unified interface for accessing
 * browser storage, supporting both Chrome's storage API and localStorage.
 * It abstracts the differences between the two environments, allowing
 * for seamless data retrieval and storage.
 */
export class ExtensionStorage {
    constructor() {
        this.isChromeEnvironment = window.chrome !== undefined &&
            window.chrome.storage !== undefined &&
            window.chrome.storage.local !== undefined;
    }

    getValue(key) {
        let data;

        if (this.isChromeEnvironment === true) {
            return new Promise((resolve) => {
                window.chrome.storage.local.get([key], result => resolve(result[key]));
            });
        } else {
            data = localStorage.getItem(key);
            return Promise.resolve(data !== null ? JSON.parse(data) : undefined);
        }
    }

    setValue(key, value) {
        if (this.isChromeEnvironment === true) {
            return new Promise((resolve) => {
                window.chrome.storage.local.set({ [key]: value }, resolve);
            });
        } else {
            localStorage.setItem(key, JSON.stringify(value));
            return Promise.resolve();
        }
    }
}
