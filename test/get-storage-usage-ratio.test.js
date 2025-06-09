import { describe, it, expect, vi } from 'vitest';

import { getStorageUsageRatio } from '../src/util/get-storage-usage-ratio.js';

describe('Get Storage Usage Ratio', () => {
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
});
