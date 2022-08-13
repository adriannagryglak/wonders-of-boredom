import React, { createContext, useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

export const ActivitiesContext = createContext(null);

export const ActivitiesContextProvider = ({ children }) => {
  const [activities, setActivities] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({category: "", tags: []});

  const activitiesCollectionRef = collection(db, "activities");

  console.log(activities);

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


  useEffect(()=>{
      filterActivities(filter);
      //eslint-disable-next-line
  }, [filter]);


  async function addActivity(activity){
    //TODO should I also setActivities(prev => prev.concat(newActivity)) ?
    await addDoc(activitiesCollectionRef, activity);
  }

  async function filterActivities({category, tags}){
    let q;
    if(category === "all" && tags.length === 0){
      q = activitiesCollectionRef;
    }else if(category === "all" && tags.length > 0){
      q = query(activitiesCollectionRef, where('tags', 'array-contains-any', tags));
    }else if(category !== "all" && tags.length === 0){
      q = query(activitiesCollectionRef, where(category, '==', true));
    }else{
      q = query(activitiesCollectionRef, where(category, '==', true), where('tags', 'array-contains-any', tags));
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
    setFilter,
  };

  return (<ActivitiesContext.Provider value={value}>{children}</ActivitiesContext.Provider>);
};

export default ActivitiesContext;