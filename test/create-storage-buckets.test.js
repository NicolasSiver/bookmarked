import { describe, it, expect } from 'vitest';

import { createStorageBuckets } from '../src/util/create-storage-buckets';

describe('Create Storage Buckets', () => {
    it('distributes items evenly across buckets with prefix', () => {
        const data = {
            a: [{ foo: 1 }, { foo: 2 }],
            b: [{ bar: 3 }, { bar: 4 }, { bar: 5 }]
        };
        const prefix = 'bucket_';
        const total = 3;
        const result = createStorageBuckets(data, prefix, total);
        // Should have 3 buckets
        expect(Object.keys(result)).toEqual([
            'bucket_0', 'bucket_1', 'bucket_2'
        ]);
        // All items should be present
        const allItems = Object.values(result).flat();
        expect(allItems).toHaveLength(5);
        // Each item should have p, pi, i fields
        allItems.forEach(item => {
            expect(item).toHaveProperty('p');
            expect(item).toHaveProperty('pi');
            expect(item).toHaveProperty('i');
        });
    });

    it('handles fewer items than buckets', () => {
        const data = { a: [{ foo: 1 }] };
        const prefix = 'b_';
        const total = 3;
        const result = createStorageBuckets(data, prefix, total);
        expect(Object.keys(result)).toEqual(['b_0']);
        expect(result['b_0']).toHaveLength(1);
    });

    it('returns empty object for empty data', () => {
        const data = {};
        const prefix = 'b_';
        const total = 2;
        const result = createStorageBuckets(data, prefix, total);
        expect(result).toEqual({});
    });
});
