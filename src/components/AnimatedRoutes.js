import { Routes, Route, useLocation } from "react-router-dom";
import App from './App';
import Activities from '../features/activities/Activities.js';
import { AnimatePresence } from 'framer-motion';

export default function AnimatedRoutes(){
    const location = useLocation();
    return(
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<App/>}/>
            <Route path="/activities" element={<Activities/>}/> 
        </Routes>
      </AnimatePresence>
    )
}