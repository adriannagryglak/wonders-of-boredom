import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Activities from './features/activities/Activities';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Activities display={true} />} />
        <Route path="/all" element={<Activities display={false}/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);