export default (address = '', action) => {
    switch (action.type) {
        case 'SET_ADDRESS':
            return action.payload;
        default:
            return address;
    }
}