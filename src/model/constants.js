/**
 * Special space identifier for the default space.
 * This space is used to represent all items that are not assigned to a specific space.
 * @type {string}
 * @constant
 */
export const DEFAULT_SPACE = 'defaultSpaceAll';

/**
 * Soft limit for the number of characters in an item title.
 * This is used to ensure that titles are not too long for display purposes.
 * @type {number}
 * @constant
 */
export const MAX_ITEM_TITLE_LENGTH = 30;

/**
 * Chrome URL for the new tab page.
 * @type {string}
 * @constant
 */
export const NEW_TAB_URL = 'chrome://newtab/';

/**
 * Number of storage buckets used for items.
 * This is used to distribute items across multiple storage buckets to avoid hitting storage limits.
 * @type {number}
 * @constant
 */
export const STORAGE_BUCKETS = 12;

/**
 * Max number of storage buckets used for items.
 * Used to prevent potential migration challenges in future.
 * @type {number}
 * @constant
 */
export const STORAGE_BUCKETS_MAX = 20;
