function showInListing(name) {
    return !name.startsWith('_') && !name.startsWith('.');
}

function getNavigatorName(name) {
    return name.replace(/[\-_]/g, ' ');
}

export { showInListing, getNavigatorName }