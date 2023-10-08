import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes';
import { Provider } from 'react-redux';
import ReduxStore from './store';

import 'resources/styles/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
/**
 * opened from vs code on web
 */
root.render(
    <Provider store={ReduxStore()}>
        <Routes />
    </Provider>
);
