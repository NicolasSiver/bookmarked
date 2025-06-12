/**
 * Creates storage buckets from a hashmap of items.
 * 
 * @param {Object} data hashmap of items to be stored in buckets
 * @param {String} prefix prefix for the storage keys
 * @param {Number} total number of buckets to create
 * @returns {Object} data distributed over buckets
 */
export function createStorageBuckets(data, prefix, total) {
    let bucketKey, i, position, itemsData;
    let items = [];
    let result = {};

    // Convert the data object into an array of items
    for (const [collectionIndex, key] of Object.keys(data).entries()) {
        itemsData = data[key];
        itemsData = itemsData.map((item, index) => {
            let clonedItem = { ...item };
            // Parent collection ID
            clonedItem.p = key;
            clonedItem.pi = collectionIndex;
            clonedItem.i = index;
            return clonedItem;
        });
        items = items.concat(itemsData);
    }

    // Split 
    for (i = 0; i < items.length; ++i) {
        position = i % total;
        bucketKey = prefix + position;

        if (result[bucketKey] === undefined) {
            result[bucketKey] = [];
        }

        result[bucketKey].push(items[i]);
    }

    return result;
}
