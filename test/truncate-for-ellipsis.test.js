import { describe, it, expect } from 'vitest';

import { truncateForEllipsis } from '../src/util/truncate-for-ellipsis.js';

describe('Truncate For Ellipsis', () => {
    it('returns the original text if within maxLength', () => {
        expect(truncateForEllipsis('Short text', 20)).toBe('Short text');
        expect(truncateForEllipsis('ExactlyTwentyFourChars!!', 24)).toBe('ExactlyTwentyFourChars!!');
    });

    it('truncates and adds ellipsis if text exceeds maxLength', () => {
        expect(truncateForEllipsis('This is a very long string that should be truncated', 20))
            .toBe('This is a very lo...');
    });

    it('returns empty string if input is an empty string', () => {
        expect(truncateForEllipsis('', 10)).toBe('');
    });

    it('throws if input is not a string (null, undefined)', () => {
        expect(() => truncateForEllipsis(null, 10)).toThrow();
        expect(() => truncateForEllipsis(undefined, 10)).toThrow();
    });

    it('returns empty string if input is a number or object', () => {
        expect(truncateForEllipsis(12345, 10)).toBe('');
        expect(truncateForEllipsis({}, 10)).toBe('');
    });

    it('uses default maxLength if not provided', () => {
        expect(truncateForEllipsis('The quick brown fox jumps over the lazy dog')).toBe('The quick brown fox j...');
    });
});
