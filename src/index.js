import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import ActivitiesAll from './features/activities/ActivitiesAll'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ActivitiesDisplay from './features/activities/ActivitiesDisplay';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<ActivitiesDisplay />} />
        <Route path="/all" element={<ActivitiesAll />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);