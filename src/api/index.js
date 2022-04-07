import axios from 'axios';

const API = axios.create({ baseURL: 'https://daospot.herokuapp.com' })



export const fetchMints = (page) => API.get(`/mints?page=${page}`);
export const createMint = (newMint) => API.post('/mints', newMint);
export const likeMint = (id, walletId) => API.patch(`/mints/${id}/${walletId}/likeMint`);
export const dislikeMint = (id, walletId) => API.patch(`/mints/${id}/${walletId}/dislikeMint`);
export const deleteMint = (id) => API.delete(`/mints/${id}`);