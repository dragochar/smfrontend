import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, DISLIKE, START_LOADING, END_LOADING, FETCH_TODAY, FETCH_TOMORROW, FETCH_TWO_DAYS, COMMENT, FETCH_ALL_GIVEAWAYS, CREATE_GIVEAWAY } from '../constants/actionTypes';

export default (state = { isLoading: true, mints: [], todayMints: [], tomorrowMints: [], twoDaysMints: [], oldMints: [] }, action) => {
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
        case "FETCH_OLD":
            console.log('yo in actions eh', action.payload);
            return {
                ...state,
                oldMints: action.payload,
            };
        case "FETCH_BY_SEARCH":
            console.log("calling reducer");
            return {
                ...state,
                mints: action.payload.data
            };
        case FETCH_TODAY:
            return { ...state, todayMints: action.payload.data };
        case FETCH_TOMORROW:
            return { ...state, tomorrowMints: action.payload.data };
        case FETCH_TWO_DAYS:
            return { ...state, twoDaysMints: action.payload.data };
        case CREATE:
            return { 
                ...state,
                mints: [ ...state.mints, action.payload],
                todayMints: [ ...state.todayMints, action.payload],
                tomorrowMints: [ ...state.tomorrowMints, action.payload],
                twoDaysMints: [ ...state.twoDaysMints, action.payload],
            };
        case UPDATE:
            return { 
                ...state,
                mints: state.mints.map((mint) => (mint._id === action.payload._id ? action.payload : mint)),
                todayMints: state.todayMints.map((mint) => (mint._id === action.payload._id ? action.payload : mint)),
                tomorrowMints: state.tomorrowMints.map((mint) => (mint._id === action.payload._id ? action.payload : mint)),
                twoDaysMints: state.twoDaysMints.map((mint) => (mint._id === action.payload._id ? action.payload : mint)),
            };
        case LIKE:
            return { 
                ...state, 
                mints: state.mints.map((mint) => (mint._id === action.payload._id ? action.payload : mint)),
                todayMints: state.todayMints.map((mint) => (mint._id === action.payload._id ? action.payload : mint)),
                tomorrowMints: state.tomorrowMints.map((mint) => (mint._id === action.payload._id ? action.payload : mint)),
                twoDaysMints: state.twoDaysMints.map((mint) => (mint._id === action.payload._id ? action.payload : mint)),
            };
        case DISLIKE:
            return { 
                ...state, 
                mints: state.mints.map((mint) => (mint._id === action.payload._id ? action.payload : mint)),
                todayMints: state.todayMints.map((mint) => (mint._id === action.payload._id ? action.payload : mint)),
                tomorrowMints: state.tomorrowMints.map((mint) => (mint._id === action.payload._id ? action.payload : mint)),
                twoDaysMints: state.twoDaysMints.map((mint) => (mint._id === action.payload._id ? action.payload : mint)),
             };
        case DELETE:
            return { 
                ...state, 
                mints: state.mints.filter((mint) => mint._id !== action.payload),
                todayMints: state.todayMints.filter((mint) => mint._id !== action.payload),
                tomorrowMints: state.tomorrowMints.filter((mint) => mint._id !== action.payload),
                twoDaysMints: state.twoDaysMints.filter((mint) => mint._id !== action.payload),
             };
        case COMMENT:
            return {
                ...state,
                mints: state.mints.map((mint) => {
                    if(mint._id === action.payload._id) {
                        return action.payload;
                    }
                    return mint;
                }),
            };
        default:
            return state;
    }
};

