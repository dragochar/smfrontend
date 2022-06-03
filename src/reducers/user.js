import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, DISLIKE, START_LOADING, END_LOADING, FETCH_TODAY, FETCH_TOMORROW, FETCH_TWO_DAYS, COMMENT, FETCH_ALL_GIVEAWAYS, CREATE_GIVEAWAY, ENTER_GIVEAWAY, DELETE_GIVEAWAY } from '../constants/actionTypes';

export default (state = { isLoading: true, user: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case "FETCH_USER":
            return {
                ...state,
                user: action.payload.data,
            };
        case "FETCH_ONE_USER":
            return {
                ...state,
                user: action.payload.data,
            }
        default:
            return state;
    }
}