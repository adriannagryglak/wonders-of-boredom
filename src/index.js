import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ActivitiesContextProvider } from "./features/activities/ActivitiesContext";
import GlobalStyles from "./styles/Global";
import AnimatedRoutes from './components/AnimatedRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <ActivitiesContextProvider>
        <AnimatedRoutes/>
      </ActivitiesContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);