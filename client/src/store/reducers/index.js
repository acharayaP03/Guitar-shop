
import { combineReducers } from 'redux';
import users from './users.reducer';
import products from "./products.reducer";
import notification from "./notification.reducer";
const appReducers = combineReducers({
    users,
    products,
    notification
});

export default appReducers;