import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./styles/Global";
import AnimatedRoutes from './components/AnimatedRoutes';
import { store } from './store.js';
import { Provider } from 'react-redux';

//store.dispatch(getActivitites) ?!??!
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <Provider store={store}>
        <AnimatedRoutes/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);