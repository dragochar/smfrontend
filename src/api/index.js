import axios from 'axios';

const API = axios.create({ baseURL: 'https://daospot.herokuapp.com' })
const twitterAPI = axios.create({ baseURL: 'https://api.twitter.com/2/users/by/username/' })



export const fetchMints = (dao, page) => API.get(`/mints/get/${dao}?page=${page}`);
export const fetchMintsBySearch = (searchQuery, dao) => API.get(`/mints/getBySearch/${dao}?searchQuery=${searchQuery}`);
export const fetchMintsBySort = (sortQuery) => API.get(`/mints/sort?sortQuery=${sortQuery.sort || 'none'}`);
export const fetchTodayMints = (dao) => API.get(`/mints/todayMints/${dao}`);
export const fetchTomorrowMints = (dao) => API.get(`/mints/tomorrowMints/${dao}`);
export const fetchTwoDaysMints = (dao) => API.get(`/mints/twoDaysMints/${dao}`);
export const createMint = (newMint) => API.post('/mints', newMint);
export const updateMint = (id, updatedMint) => API.patch(`/mints/${id}`, updatedMint);
export const likeMint = (id, walletId) => API.patch(`/mints/${id}/${walletId}/likeMint`);
export const dislikeMint = (id, walletId) => API.patch(`/mints/${id}/${walletId}/dislikeMint`);
export const comment = (value, id) => API.post(`/mints/${id}/commentPost`, { value });
export const deleteMint = (id) => API.delete(`/mints/${id}`);
export const fetchTwitter = (twitter) => twitterAPI.get(`${twitter}?user.fields=public_metrics`);
export const createGiveaway = (newGiveaway) => API.post('/mints/giveaways', newGiveaway);
export const fetchGiveaways = (dao, page) => API.get(`/mints/giveaways/get/${dao}?page=${page}`);
export const enterGiveaway = (value, id) => API.post(`/mints/giveaways/${id}/enterGiveaway`, { value });
export const getOrCreateUser = (code) => API.get(`/mints/users/${code}`);
export const deleteGiveaway = (id) => API.delete(`/mints/giveaways/${id}`);
export const getUser = (id) => API.get(`/mints/user/${id}`);
export const updateUserTwitterWallet = (id, twitter, wallet) => API.get(`/mints/users/updateTwitterWallet/${id}/${twitter}/${wallet}`);
export const updateFollowingTwitter = (userID, giveawayID, boolean) => API.get(`/mints/users/updateFollowingTwitter/${userID}/${giveawayID}/${boolean}`);
export const updateInDiscord = (code) => API.get(`/mints/giveaways/updateInDiscord/${code}`);


