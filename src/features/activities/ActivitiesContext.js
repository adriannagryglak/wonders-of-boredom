import React, { createContext, useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

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
        //TODO - catch all errors from firebase
        setErrors(error.message);
      }finally{
        setLoading(false);
      }};

    getActivities();
     // eslint-disable-next-line
  }, []);


  async function addActivity(activity){
    //TODO should I also setActivities(prev => prev.concat(newActivity)) ?
    await addDoc(activitiesCollectionRef, activity);
  }

  async function filterActivities({category, tags}){
    //TODO tags not working , complex query firebase

    let q;
    if(category === "" && tags.length > 0){ //nie ma cat są tags
      q = query(activitiesCollectionRef, where('tags', 'in', tags));
    }else if(category !== "" && tags.length === 0){ // jest cat nie ma tags
      q = query(activitiesCollectionRef, where(category, '==', true));
    }else if(category === "" && tags.length === 0){ //nie ma cat nie ma tags
      q = activitiesCollectionRef;
    }else{ //jest cat jest tags
      q = query(activitiesCollectionRef, where(category, '==', true), where('tags', 'array-contains', tags) )
    }

    const data = await getDocs(q);
    setActivities(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  const value = {
    //TODO- make sure its optimal for performance
    activities,
    errors,
    loading,
    addActivity,
    filterActivities,
  };

  return (<ActivitiesContext.Provider value={value}>{children}</ActivitiesContext.Provider>);
};

export default ActivitiesContext;