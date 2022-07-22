import React, { createContext, useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const ActivitiesContext = createContext(null);

export const ActivitiesContextProvider = ({ children }) => {
  const [activities, setActivities] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const activitiesCollectionRef = collection(db, "activities");

  useEffect(()=>{
    const getActivities = async () => {
      try{
        const data = await getDocs(activitiesCollectionRef);
        setActivities(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }catch(error){
        //TODO - catch more errors from firebase
        setErrors(error.message);
      }finally{
        setLoading(false);
      }};

    getActivities();
     // eslint-disable-next-line
  }, []);

  //TODO- add new activity 
  function addActivity(newActivity="ex.walking"){
    //firebase add docs ..
    //setActivities(prev => prev.concat(newActivity));
  }

  const value = {
    //TODO- make sure its optimal for performance
    activities,
    errors,
    loading,
    addActivity,
  };

  return (<ActivitiesContext.Provider value={value}>{children}</ActivitiesContext.Provider>);
};

export default ActivitiesContext;