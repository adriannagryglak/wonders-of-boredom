import { createContext, useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";

export const ActivitiesContext = createContext(null);

export const ActivitiesContextProvider = ({ children }) => {

  const [activities, setActivities] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({category: "all", tags: []});
  //TODO make searchParams work both ways, from url as a filter too
  const [searchParams, setSearchParams] = useSearchParams();

  const activitiesCollectionRef = collection(db, "activities");

  useEffect(()=>{
      filterActivities(filter);
      setSearchParams(filter.category === "all" ? {tags: filter.tags} : filter);
      //eslint-disable-next-line
  }, [filter]);

  // async function addActivity(activity){
  //   //TODO should I also setActivities(prev => prev.concat(newActivity)) ?
  //   await addDoc(activitiesCollectionRef, activity);
  // }

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

    try{
      const data = await getDocs(q);
      setActivities(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }catch(e){
      setErrors(e.message);
    }finally{
      setLoading(false);
    }
  }

  const value = {
    //TODO- make sure its optimal for performance
    activities,
    errors,
    loading,
    filter,
    setFilter,
    setActivities,
  };

  return (<ActivitiesContext.Provider value={value}>{children}</ActivitiesContext.Provider>);
};

export default ActivitiesContext;