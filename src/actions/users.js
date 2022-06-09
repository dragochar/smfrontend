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

export const getOneUserWithID = (id) => async (dispatch) => {
    try {
        const { data } = await api.getUser(id);
        dispatch({ type: 'FETCH_ONE_USER', payload: data });

        return { data };
    } catch (error) {
        console.log(error.message);
    }

};

export const updateUserTwitterWallet = (id, twitter, wallet) => async (dispatch) => {
    try {
        const { data } = await api.updateUserTwitterWallet(id, twitter, wallet);
        dispatch({ type: "UPDATE_TWITTER_WALLET", payload: data });
    } catch (error) {
        console.log(error.message)
    }


}

export const updateFollowingTwitter = (userID, giveawayID, boolean) => async (dispatch) => {
    try {
        const { data } = await api.updateFollowingTwitter(userID, giveawayID, boolean);
        dispatch({ type: "UPDATE_FOLLOWING_TWITTER", payload: data });
    } catch (error) {
        console.log(error.message)
    }

}

export const updateInDiscord = (code, userID) => async (dispatch) => {
    try {
        const { data } = await api.updateInDiscord(code, userID);
        dispatch({ type: "UPDATE_IN_DISCORD", payload: data });
    } catch (error) {
        console.log(error.message)
    }



}
