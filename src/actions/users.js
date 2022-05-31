import * as api from '../api/index.js';


export const getUser = (code) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.getOrCreateUser(code);
        console.log('sent and got', data);
        dispatch({ type: 'FETCH_USER', payload: data });
        dispatch({ type: 'END_LOADING' });

        return { data };
    } catch (error) {
        console.log(error.message);
    }

};
