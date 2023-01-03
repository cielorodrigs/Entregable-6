import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootswatch/dist/lux/bootstrap.min.css';
// npm install bootswatch
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
