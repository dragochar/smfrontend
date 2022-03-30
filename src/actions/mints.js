import * as api from '../api';
import { useState } from 'react';

//Action Creators
export const getMints = () => async (dispatch) => {
    try {
        const { data } = await api.fetchMints();
        dispatch({ type: 'FETCH_ALL', payload: data });

    } catch (error) {
        console.log(error.message);
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


export const likeMint = (id, wallet) => async (dispatch) => {

    try {
        const { data } = await api.likeMint(id, wallet);

        dispatch({ type: 'UPDATE', payload: data });


    } catch (error) {
        console.log(error.message);
    }
}

export const dislikeMint = (id, wallet) => async (dispatch) => {

    try {
        const { data } = await api.dislikeMint(id, wallet);

        dispatch({ type: 'UPDATE', payload: data });


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