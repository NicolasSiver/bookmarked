export function getShortTitle(text, limit = 10) {
    let description, title, splitIndex;

    if (text.length <= limit) {
        title = text;
        description = '';
    } else {
        // Find the last space before or at the limit
        splitIndex = text.lastIndexOf(' ', limit);
        
        if (splitIndex === -1) {
            // No space found before limit, fallback to hard cut
            title = text.slice(0, limit);
            description = text;
        } else {
            title = text.slice(0, splitIndex);
            description = text;
        }
    }

    return { title, description };
}
