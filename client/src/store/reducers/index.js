import { combineReducers } from 'redux';
import users from './users.reducer';
import products from './products.reducer';
import notification from './notification.reducer';
import brands from './brands.reducer';
const appReducers = combineReducers({
    users,
    products,
    notification,
    brands,
});

export default appReducers;
