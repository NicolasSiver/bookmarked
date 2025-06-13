import { describe, it, expect } from 'vitest';

import { composeDataFromBuckets } from '../src/util/compose-data-from-buckets';

describe('composeDataFromBuckets', () => {
    it('reconstructs grouped data from buckets and removes service fields', () => {
        const buckets = {
            bucket_0: [
                { foo: 1, p: 'a', pi: 0, i: 0 },
                { bar: 2, p: 'b', pi: 1, i: 0 }
            ],
            bucket_1: [
                { foo: 3, p: 'a', pi: 0, i: 1 },
                { bar: 4, p: 'b', pi: 1, i: 1 }
            ]
        };
        const result = composeDataFromBuckets(buckets);
        expect(Object.keys(result)).toEqual(['a', 'b']);
        expect(result['a']).toHaveLength(2);
        expect(result['b']).toHaveLength(2);
        // Service fields should be removed
        result['a'].forEach(item => {
            expect(item).not.toHaveProperty('p');
            expect(item).not.toHaveProperty('pi');
            expect(item).not.toHaveProperty('i');
        });
    });

    it('returns empty object for empty buckets', () => {
        expect(composeDataFromBuckets({})).toEqual({});
    });

    it('ignores non-array bucket values', () => {
        const buckets = {
            bucket_0: [ { foo: 1, p: 'a', pi: 0, i: 0 } ],
            not_a_bucket: 'string',
            another: 123
        };
        const result = composeDataFromBuckets(buckets);
        expect(Object.keys(result)).toEqual(['a']);
        expect(result['a']).toHaveLength(1);
    });

    it('sorts items by parent index and item index', () => {
        const buckets = {
            bucket_0: [
                { foo: 1, p: 'a', pi: 1, i: 1 },
                { foo: 2, p: 'a', pi: 1, i: 0 }
            ]
        };
        const result = composeDataFromBuckets(buckets);
        expect(result['a'][0].foo).toBe(2);
        expect(result['a'][1].foo).toBe(1);
    });
});
