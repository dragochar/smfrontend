
export default (state, action) => {
    switch (action.type) {
        case 'FETCH_TWITTER':
            return action.payload;
        default:
            return '';
    }
}