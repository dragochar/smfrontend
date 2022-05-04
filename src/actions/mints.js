import * as api from '../api';
import { useState } from 'react';

//Action Creators
export const getMints = (page) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchMints(page);
        dispatch({ type: 'FETCH_ALL', payload: { data, currentPage, numberOfPages } });
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
    }

}

export const getMintsBySort = (sortQuery) => async (dispatch) => {
    try {
        const { data } = await api.fetchMintsBySort(sortQuery);

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const createMint = (mint) => async (dispatch) => {
    try {
        const { data } = await api.createMint(mint);

        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateMint = (id, mint) => async (dispatch) => {
    try {

        const { data } = await api.updateMint(id, mint);
        dispatch({ type: 'UPDATE', payload: data });

    } catch (error) {
        console.log(error.message);
    }

}

export const likeMint = (id, wallet) => async (dispatch) => {

    try {
        const { data } = await api.likeMint(id, wallet);

        dispatch({ type: 'LIKE', payload: data });


    } catch (error) {
        console.log(error.message);
    }
}

export const dislikeMint = (id, wallet) => async (dispatch) => {

    try {
        const { data } = await api.dislikeMint(id, wallet);

        dispatch({ type: 'DISLIKE', payload: data });


    } catch (error) {
        console.log(error.message);
    }
}


export const deleteMint = (id) => async (dispatch) => {
    try {
        await api.deleteMint(id);
        dispatch({ type: 'DELETE', payload: id });

    } catch(error) {
        console.log(error);
    }
}

