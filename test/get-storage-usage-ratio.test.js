import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { getStorageUsageRatio } from '../src/util/get-storage-usage-ratio.js';

describe('Get Storage Usage Ratio', () => {
    let origChrome;
    let origWindow;

    beforeEach(() => {
        origChrome = global.chrome;
        origWindow = global.window;
    });

    afterEach(() => {
        global.chrome = origChrome;
        global.window = origWindow;
    });

    it('resolves with correct ratio when usage is below limit', async () => {
        global.chrome = {
            storage: {
                sync: {
                    getBytesInUse: vi.fn((_, cb) => cb(50000))
                }
            },
            runtime: {}
        };

        await expect(getStorageUsageRatio(100000)).resolves.toBe(0.5);
    });

    it('resolves with 1 when usage exceeds limit', async () => {
        global.chrome = {
            storage: {
                sync: {
                    getBytesInUse: vi.fn((_, cb) => cb(150000))
                }
            },
            runtime: {}
        };

        await expect(getStorageUsageRatio(100000)).resolves.toBe(1);
    });

    it('rejects when chrome.runtime.lastError exists', async () => {
        const error = new Error('Quota exceeded');
        global.chrome = {
            storage: {
                sync: {
                    getBytesInUse: vi.fn((_, cb) => {
                        global.chrome.runtime.lastError = error;
                        cb(0);
                    })
                }
            },
            runtime: {}
        };

        await expect(getStorageUsageRatio(100000)).rejects.toBe(error);
        global.chrome.runtime.lastError = undefined;
    });

    it('rejects on exception', async () => {
        global.chrome = {
            storage: {
                sync: {
                    getBytesInUse: vi.fn(() => { throw new Error('Unexpected'); })
                }
            },
            runtime: {}
        };

        await expect(getStorageUsageRatio(100000)).rejects.toThrow('Unexpected');
    });

    it('resolves to a number between 0 and 1 in Chrome environment (mocked)', async () => {
        global.chrome = {
            storage: {
                sync: {
                    getBytesInUse: (key, cb) => cb(51200)
                }
            },
            runtime: {}
        };
        const ratio = await getStorageUsageRatio(102400);
        expect(ratio).toBeCloseTo(0.5, 2);
    });

    it('returns 0.88 in dev environment (localStorage present)', async () => {
        global.window = { localStorage: {} };
        const ratio = await getStorageUsageRatio(102400);
        expect(ratio).toBe(0.88);
    });

    it('returns 0.08 if no storage is available', async () => {
        delete global.window;
        const ratio = await getStorageUsageRatio(102400);
        expect(ratio).toBe(0.08);
    });
});
