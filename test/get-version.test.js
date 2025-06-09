// Use jsdom environment for this test file
// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { getVersion } from '../src/util/get-version.js';

describe('Get Version', () => {
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

    it('returns version from chrome.runtime.getManifest if available', () => {
        const fakeManifest = { version: '1.2.3' };
        window.chrome = {
            runtime: {
                getManifest: vi.fn(() => fakeManifest)
            }
        };

        expect(getVersion()).toBe('1.2.3');
        expect(window.chrome.runtime.getManifest).toHaveBeenCalled();
    });

    it('returns default version if chrome or runtime is undefined', () => {
        delete window.chrome;
        expect(getVersion()).toBe('0.0.0');

        window.chrome = {};
        expect(getVersion()).toBe('0.0.0');
    });
});
