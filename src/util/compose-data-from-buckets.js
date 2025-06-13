/**
 * Composes data from storage buckets into a structured object.
 * 
 * @param {Object} buckets storage bucket data
 * @property {Array} buckets.<bucketName> Array of items in the bucket
 * @property {string} buckets.<bucketName>.<item>.p The parent ID of the item
 * @property {number} buckets.<bucketName>.<item>.pi The parent index of the item
 * @property {number} buckets.<bucketName>.<item>.i The index of the item in the bucket
 * @returns {Object} Composed data object of items grouped by parent (Collection) ID
 */
export function composeDataFromBuckets(buckets) {
    let result = {};
    let bucketList = Object.values(buckets).filter(bucket => Array.isArray(bucket));
    let bucketItems = bucketList.flat();

    bucketItems.sort((left, right) => {
        let order = left.pi - right.pi;

        if (order === 0) {
            order = left.i - right.i;
        }

        return order;
    });

    bucketItems.forEach(item => {
        if (result[item.p] === undefined) {
            result[item.p] = [];
        }

        result[item.p].push(item);

        // Remove service fields
        delete item.p;
        delete item.pi;
        delete item.i;
    });

    return result;
}
