import { createContext, useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";

export const ActivitiesContext = createContext(null);

export const ActivitiesContextProvider = ({ children }) => {
  

  const activitiesCollectionRef = collection(db, "activities");
  const [activities, setActivities] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams({category: "all", tags: []});
  const [sorting, setSorting] = useState("top rated activities");
  
  const categories = ["outdoor", "solo", "all"];
  const tags = ["active", "autumn", "cozy"];

  useEffect(()=>{
    let currentCategory = searchParams.get('category');
    let currentTags = [...new Set(searchParams.getAll('tags').filter(el => tags.includes(el)))];
    let currentParams;

    if(currentCategory === "all"){
      currentParams = {tags: currentTags};
    }else if(!categories.includes(currentCategory)){
      setErrors(`"${currentCategory}" category doesn't exist... yet`);
      currentParams = {tags: currentTags};
    }else{
      setErrors(null);
      currentParams = {category: currentCategory, tags: currentTags}
    }
    
    setSearchParams(currentParams);
    filterActivities(currentParams);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);


  // async function addActivity(activity){
  //   //TODO should I also setActivities(prev => prev.concat(newActivity)) ?
  //   await addDoc(activitiesCollectionRef, activity);
  // }

  async function filterActivities({category, tags}){
   
    let q;
    if(!category && tags.length === 0){
      q = activitiesCollectionRef;
    }else if(!category && tags.length > 0){
      q = query(activitiesCollectionRef, where('tags', 'array-contains-any', tags));
    }else if(category && tags.length === 0){
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
    sorting,
    setSorting,
    tags, 
    categories
  };

  return (<ActivitiesContext.Provider value={value}>{children}</ActivitiesContext.Provider>);
};

export default ActivitiesContext;