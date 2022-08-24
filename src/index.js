import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Activities from './features/activities/Activities.js';
import { ActivitiesContextProvider } from "./features/activities/ActivitiesContext";
import GlobalStyles from "./styles/Global";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    
    <GlobalStyles />
    <ActivitiesContextProvider>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/activities" element={<Activities/>}/>
      </Routes>
    </ActivitiesContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);