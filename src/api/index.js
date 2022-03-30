import axios from 'axios';

//const url = 'http://localhost:5000';
const url = 'https://daospot.herokuapp.com/mints';

export const fetchMints = () => axios.get(url);
export const createMint = (newMint) => axios.post(url, newMint);
export const likeMint = (id, walletId) => axios.patch(`${url}/${id}/${walletId}/likeMint`);
export const dislikeMint = (id, walletId) => axios.patch(`${url}/${id}/${walletId}/dislikeMint`);
export const deleteMint = (id) => axios.delete(`${url}/${id}`);