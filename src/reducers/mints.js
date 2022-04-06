import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, DISLIKE } from '../constants/actionTypes';

export default (state = { mints: [] }, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,
                mints: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case CREATE:
            return [ ...state, action.payload];
        
        case LIKE:
            return state.map((mint) => (mint._id === action.payload._id ? action.payload : mint));

        case DISLIKE:
            return state.map((mint) => (mint._id === action.payload._id ? action.payload : mint));
        case DELETE:
            return state.filter((mint) => mint._id !== action.payload);
        default:
            return state;
    }
};

