import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import CommentsBody from './commentsBody/commentsBody';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CommentsBody />
    </Provider>
  </React.StrictMode>
);

