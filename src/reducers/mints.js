export default (mints = [], action) => {
    switch (action.type) {
        case 'DELETE':
            return mints.filter((mint) => mint._id !== action.payload);
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [ ...mints, action.payload];
        
        case 'LIKE':
            return mints.map((mint) => (mint._id === action.payload._id ? action.payload : mint));

        case 'DISLIKE':
            return mints.map((mint) => (mint._id === action.payload._id ? action.payload : mint));
        
        default:
            return mints;
    }
};

