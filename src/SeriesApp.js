import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import Router from './Router';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( rootReducer, composeEnhancers(
    applyMiddleware( reduxThunk )
));

const SeriesApp = props => (
    <Provider store={ store }>
        <Router />
    </Provider>
);

export default SeriesApp;
