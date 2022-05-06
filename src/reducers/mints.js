import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, DISLIKE, START_LOADING, END_LOADING, FETCH_TODAY } from '../constants/actionTypes';

export default (state = { isLoading: true, mints: [], todayMints: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                mints: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_TODAY:
            return { ...state, todayMints: action.payload.data };
        case CREATE:
            return { 
                ...state,
                mints: [ ...state.mints, action.payload],
                todayMints: [ ...state.todayMints, action.payload],
            };
        case UPDATE:
            return { 
                ...state,
                mints: state.mints.map((mint) => (mint._id === action.payload._id ? action.payload : mint)),
                todayMints: state.todayMints.map((mint) => (mint._id === action.payload._id ? action.payload : mint)),
            };
        case LIKE:
            return { 
                ...state, 
                mints: state.mints.map((mint) => (mint._id === action.payload._id ? action.payload : mint)),
                todayMints: state.todayMints.map((mint) => (mint._id === action.payload._id ? action.payload : mint))
            };
        case DISLIKE:
            return { 
                ...state, 
                mints: state.mints.map((mint) => (mint._id === action.payload._id ? action.payload : mint)),
                todayMints: state.todayMints.map((mint) => (mint._id === action.payload._id ? action.payload : mint))
             };
        case DELETE:
            return { 
                ...state, 
                mints: state.mints.filter((mint) => mint._id !== action.payload),
                todayMints: state.todayMints.filter((mint) => mint._id !== action.payload),
             };
        default:
            return state;
    }
};

