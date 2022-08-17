import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes';
import { Provider} from "react-redux";
import ReduxStore from "./store";

import 'resources/styles/styles.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={ReduxStore()}>
        <React.StrictMode>
            <Routes />
        </React.StrictMode>
    </Provider>
);

