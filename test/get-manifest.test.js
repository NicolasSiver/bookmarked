// Use jsdom environment for this test file
// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { getManifest } from '../src/util/get-manifest.js';

describe('Get Manifest', () => {
    let originalChrome;

    beforeEach(() => {
        // Save the original chrome object if it exists
        originalChrome = window.chrome;
    });

    afterEach(() => {
        // Restore the original chrome object after each test
        if (originalChrome === undefined) {
            delete window.chrome;
        } else {
            window.chrome = originalChrome;
        }
    });

    it('returns manifest object if chrome.runtime.getManifest exists', () => {
        const fakeManifest = { name: 'Test Extension' };
        window.chrome = {
            runtime: {
                getManifest: vi.fn(() => fakeManifest)
            }
        };

        expect(getManifest()).toBe(fakeManifest);
        expect(window.chrome.runtime.getManifest).toHaveBeenCalled();
    });

    it('returns null if window.chrome is undefined', () => {
        delete window.chrome;
        expect(getManifest()).toBeNull();
    });

    it('returns null if window.chrome.runtime is undefined', () => {
        window.chrome = {};
        expect(getManifest()).toBeNull();
    });
});
