import { Routes, Route} from "react-router-dom";
import App from './App';
import Activities from '../features/activities/Activities.js';
import { AnimatePresence } from 'framer-motion';
import CreateActivity from "../features/create-activity/CreateActivity";

export default function AnimatedRoutes(){
   
    return(
      <AnimatePresence>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/activities" element={<Activities/>}/> 
            <Route path="/create-wonders" element={<CreateActivity/>}/>
        </Routes>
      </AnimatePresence>
    )
}