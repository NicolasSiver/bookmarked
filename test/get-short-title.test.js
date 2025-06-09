import { describe, it, expect } from 'vitest';

import { getShortTitle } from '../src/util/get-short-title.js';

describe('Get Short Title', () => {
    it('returns the whole text as title and empty description if text is within limit', () => {
        expect(getShortTitle('Short', 10)).toEqual({ title: 'Short', description: '' });
        expect(getShortTitle('ExactlyTen', 10)).toEqual({ title: 'ExactlyTen', description: '' });
    });

    it('splits at the last space before or at the limit', () => {
        expect(getShortTitle('This is a long title', 10)).toEqual({
            title: 'This is a',
            description: 'This is a long title'
        });
        expect(getShortTitle('Hello world example', 11)).toEqual({
            title: 'Hello world',
            description: 'Hello world example'
        });
    });

    it('cuts hard at limit if no space before limit', () => {
        expect(getShortTitle('Supercalifragilistic', 5)).toEqual({
            title: 'Super',
            description: 'Supercalifragilistic'
        });
        expect(getShortTitle('abcdefghijk', 5)).toEqual({
            title: 'abcde',
            description: 'abcdefghijk'
        });
    });

    it('handles text with space exactly at the limit', () => {
        expect(getShortTitle('Hello world', 5)).toEqual({
            title: 'Hello',
            description: 'Hello world'
        });
        expect(getShortTitle('Hello world', 6)).toEqual({
            title: 'Hello',
            description: 'Hello world'
        });
    });

    it('returns empty title and description for empty input', () => {
        expect(getShortTitle('', 10)).toEqual({ title: '', description: '' });
    });

    it('handles limit of 0', () => {
        expect(getShortTitle('Some text', 0)).toEqual({
            title: '',
            description: 'Some text'
        });
    });

    it('handles text with no spaces', () => {
        expect(getShortTitle('abcdefghijk', 7)).toEqual({
            title: 'abcdefg',
            description: 'abcdefghijk'
        });
    });

    it('handles text with space just after the limit', () => {
        expect(getShortTitle('HelloWorld Test', 10)).toEqual({
            title: 'HelloWorld',
            description: 'HelloWorld Test'
        });
    });
});
