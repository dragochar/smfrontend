import * as api from '../api/index.js';

export const getTwitterStats = (twitter) => async (dispatch) => {
    try {
        const { data } = await api.fetchTwitter(twitter);
        dispatch({ type: 'FETCH_TWITTER', payload: data });

    } catch (error) {
        console.log(error.message);
    }

};