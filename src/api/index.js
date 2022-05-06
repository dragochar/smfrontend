import axios from 'axios';

const API = axios.create({ baseURL: 'https://daospot.herokuapp.com' })



export const fetchMints = (page) => API.get(`/mints?page=${page}`);
export const fetchMintsBySort = (sortQuery) => API.get(`/mints/sort?sortQuery=${sortQuery.sort || 'none'}`)
export const fetchTodayMints = () => API.get(`/mints/todayMints`)
export const fetchTomorrowMints = () => API.get(`/mints/tomorrowMints`)
export const fetchTwoDaysMints = () => API.get(`/mints/twoDaysMints`)
export const createMint = (newMint) => API.post('/mints', newMint);
export const updateMint = (id, updatedMint) => API.patch(`/mints/${id}`, updatedMint);
export const likeMint = (id, walletId) => API.patch(`/mints/${id}/${walletId}/likeMint`);
export const dislikeMint = (id, walletId) => API.patch(`/mints/${id}/${walletId}/dislikeMint`);
export const deleteMint = (id) => API.delete(`/mints/${id}`);