export function createBucketKeys(prefix, total) {
    let i;
    let result = [];

    for (i = 0; i < total; ++i) {
        result.push(prefix + i);
    }

    return result;
}
