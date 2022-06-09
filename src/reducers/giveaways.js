import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, DISLIKE, START_LOADING, END_LOADING, FETCH_TODAY, FETCH_TOMORROW, FETCH_TWO_DAYS, COMMENT, FETCH_ALL_GIVEAWAYS, CREATE_GIVEAWAY, ENTER_GIVEAWAY, DELETE_GIVEAWAY } from '../constants/actionTypes';

export default (state = { isLoading: true, giveaways: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL_GIVEAWAYS:
            return {
                ...state,
                giveaways: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case CREATE_GIVEAWAY:
            return { 
                ...state,
                giveaways: [ ...state.giveaways, action.payload],
            };
        case ENTER_GIVEAWAY:
            return {
                ...state,
                giveaways: state.giveaways.map((giveaway) => {
                    if(giveaway._id === action.payload._id) {
                        return action.payload;
                    }
                    return giveaway;
                }),
            };
        case DELETE_GIVEAWAY:
            return { 
                ...state, 
                giveaways: state.giveaways.filter((giveaway) => giveaway._id !== action.payload),
                };
        default:
            return state;
    }
}