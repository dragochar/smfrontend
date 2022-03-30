import { combineReducers } from 'redux';

import user from './user';
import mints from './mints';

export default combineReducers({ user, mints });