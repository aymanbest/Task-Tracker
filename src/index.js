import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { legacy_createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import Reducer from './store/reducer';


const store = legacy_createStore(Reducer, composeWithDevTools(
  applyMiddleware()),);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);


