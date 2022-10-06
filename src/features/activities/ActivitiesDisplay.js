import { db } from "../../firebase-config";
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { ActivitiesStyled, ActivitiesWrapperStyled, ActivitiesMenusWrapperStyled, ActivityStyled } from "./ActivitiesStyled";
import SortingMenu from "./SortingMenu";
import { getRandomInt } from "../../utils";
import { Link } from "react-router-dom";
import Message from "./Message";
import { useSelector } from 'react-redux';
import { selectActivitiesState } from "./activitiesSlice";

export default function ActivitiesDisplay() {
  const { sorting } = useSelector(selectActivitiesState);
  const [activities, setActivities] = useState();
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activitiesCollectionRef = collection(db, "activities");

  useEffect(()=>{
    const getData = async()=>{
        let q;
        if(sorting.includes("top")){
          q = query(activitiesCollectionRef, orderBy("points", "desc"), limit(3));
        }else if(sorting.includes("least")){
          q = query(activitiesCollectionRef, orderBy("points"), limit(3));
        }else{
          let max;
          let min;
          try{
            setErrors(null);
            setActivities([]);
            setLoading(true);
            const heighest = await getDocs(query(activitiesCollectionRef, orderBy("points", "desc"), limit(3)));
            const lowest = await getDocs(query(activitiesCollectionRef, orderBy("points"), limit(1)));
            max = heighest.docs.map((doc) => ({ ...doc.data()}))[2].points;
            min = lowest.docs.map((doc) => ({ ...doc.data()}))[0].points;
            let random = Math.floor(Math.random() * (max - min + 1)) + min;
            q = query(activitiesCollectionRef, where("points", ">=", random), limit(3));
          }catch(e){
            setErrors(e.message);
          }
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
    getData();  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  return (
    <ActivitiesStyled blur={!isMenuOpen} isDisplay={true}>
      <ActivitiesMenusWrapperStyled>
        <SortingMenu isOpen={isMenuOpen} setIsOpen={()=>{setIsMenuOpen(prev => !prev)}} />
      </ActivitiesMenusWrapperStyled>
        <Message errors={errors} loading={loading}/>
      <ActivitiesWrapperStyled>
        {activities && activities.map((activity) =>{
            return( <ActivityStyled key={activity.id} random={[getRandomInt(-100, 100),getRandomInt(-50, 50),getRandomInt(-30, 30),getRandomInt(-120, 120)]}>
                                        <h2>{activity.name}</h2>
                                </ActivityStyled>)
        })}
      </ActivitiesWrapperStyled>
      <Link to="/activities" className="activites-link__see-more">see more...</Link>
    </ActivitiesStyled>
  );
}