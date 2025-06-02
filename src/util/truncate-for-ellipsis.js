export function truncateForEllipsis(text, maxLength = 24) {
    let result = text;

    if (typeof text !== 'string') {
        result = '';
    }
    
    if (text.length > maxLength) {
        result = text.slice(0, maxLength - 3) + '...';
    }

    return result;
}
