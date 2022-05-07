import axios from 'axios';

const API = axios.create({ baseURL: 'https://daospot.herokuapp.com' })



export const fetchMints = (dao, page) => API.get(`/mints/get/${dao}?page=${page}`);
export const fetchMintsBySort = (sortQuery) => API.get(`/mints/sort?sortQuery=${sortQuery.sort || 'none'}`)
export const fetchTodayMints = (dao) => API.get(`/mints/todayMints/${dao}`)
export const fetchTomorrowMints = (dao) => API.get(`/mints/tomorrowMints/${dao}`)
export const fetchTwoDaysMints = (dao) => API.get(`/mints/twoDaysMints/${dao}`)
export const createMint = (newMint) => API.post('/mints', newMint);
export const updateMint = (id, updatedMint) => API.patch(`/mints/${id}`, updatedMint);
export const likeMint = (id, walletId) => API.patch(`/mints/${id}/${walletId}/likeMint`);
export const dislikeMint = (id, walletId) => API.patch(`/mints/${id}/${walletId}/dislikeMint`);
export const deleteMint = (id) => API.delete(`/mints/${id}`);