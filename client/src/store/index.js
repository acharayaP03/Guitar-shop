import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk"; // for async call
import appReducers from './reducers';

/**
 * Setup Root Store for app.
 */
const ReduxStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;

    const store = createStore(
        appReducers,
        composeEnhancers(applyMiddleware(thunk))
    );

    return store
}

export default ReduxStore;