import * as api from '../api/index.js';
import { useState } from 'react';

//Action Creators
export const getMints = (dao, page) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchMints(dao, page);
        dispatch({ type: 'FETCH_ALL', payload: { data, currentPage, numberOfPages } });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }

};

export const getOldMints = (dao) => async (dispatch) => {
    try {
        const { data: { data } } = await api.fetchOldMints(dao);
        dispatch({ type: 'FETCH_OLD', payload: { data } });
    } catch (error) {
        console.log(error.message);
    }

};

export const getMintsBySearch = (searchQuery, dao) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data: { data } } = await api.fetchMintsBySearch(searchQuery, dao);
        dispatch({ type: 'FETCH_BY_SEARCH', payload: { data } });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
}

export const getGiveaways = (dao, page) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchGiveaways(dao, page);
        dispatch({ type: 'FETCH_ALL_GIVEAWAYS', payload: { data, currentPage, numberOfPages } });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }

};

export const getTodayMints = (dao) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data: { data } } = await api.fetchTodayMints(dao);
        dispatch({ type: 'FETCH_TODAY', payload: { data } });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }
};

export const getTomorrowMints = (dao) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data: { data } } = await api.fetchTomorrowMints(dao);
        dispatch({ type: 'FETCH_TOMORROW', payload: { data } });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }

};


export const getTwoDaysMints = (dao) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data: { data } } = await api.fetchTwoDaysMints(dao);
        dispatch({ type: 'FETCH_TWO_DAYS', payload: { data } });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }

};

export const getMintsBySort = (sortQuery) => async (dispatch) => {
    try {
        const { data } = await api.fetchMintsBySort(sortQuery);

        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

export const createMint = (mint) => async (dispatch) => {
    try {
        const { data } = await api.createMint(mint);

        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createGiveaway = (giveaway) => async (dispatch) => {
    try {
        const { data } = await api.createGiveaway(giveaway);

        dispatch({ type: 'CREATE_GIVEAWAY', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateMint = (id, mint) => async (dispatch) => {
    try {

        const { data } = await api.updateMint(id, mint);
        dispatch({ type: 'UPDATE', payload: data });

    } catch (error) {
        console.log(error.message);
    }

};

export const likeMint = (id, wallet) => async (dispatch) => {

    try {
        const { data } = await api.likeMint(id, wallet);

        dispatch({ type: 'LIKE', payload: data });


    } catch (error) {
        console.log(error.message);
    }
};

export const dislikeMint = (id, wallet) => async (dispatch) => {

    try {
        const { data } = await api.dislikeMint(id, wallet);

        dispatch({ type: 'DISLIKE', payload: data });


    } catch (error) {
        console.log(error.message);
    }
};


export const deleteMint = (id) => async (dispatch) => {
    try {
        await api.deleteMint(id);
        dispatch({ type: 'DELETE', payload: id });

    } catch(error) {
        console.log(error);
    }
};

export const commentPost = (value, id) => async (dispatch) => {
    try {
       const { data } = await api.comment(value, id);
        
       dispatch({ type: 'COMMENT', payload: data});

       return data.comments;

    } catch (error) {
        console.log(error);
    }
};

export const enterGiveaway = (value, id) => async (dispatch) => {
    try {
       const { data } = await api.enterGiveaway(value, id);
        
       dispatch({ type: 'ENTER_GIVEAWAY', payload: data});

       return data.entries;

    } catch (error) {
        console.log(error);
    }
};

export const deleteGiveaway = (id) => async (dispatch) => {
    try {
        await api.deleteGiveaway(id);
        dispatch({ type: 'DELETE_GIVEAWAY', payload: id });

    } catch(error) {
        console.log(error);
    }
};

