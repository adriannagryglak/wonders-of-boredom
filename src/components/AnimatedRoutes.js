import { Routes, Route} from "react-router-dom";
import App from './App';
import Activities from '../features/activities/Activities.js';
import { AnimatePresence } from 'framer-motion';
import ScrollToTop from './ScrollToTop';

export default function AnimatedRoutes(){
   
    return(
      <AnimatePresence>
        <ScrollToTop key='topScroll'/>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/activities" element={<Activities/>}/> 
        </Routes>
      </AnimatePresence>
    )
}