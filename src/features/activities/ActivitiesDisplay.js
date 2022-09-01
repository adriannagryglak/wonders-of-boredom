import { db } from "../../firebase-config";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { ActivitiesStyled, ActivitiesWrapperStyled, ActivitiesMenusWrapperStyled, ActivityStyled } from "./ActivitiesStyled";
import SortingMenu from "./SortingMenu";
import { getRandomInt } from "../../utils";
import { Link } from "react-router-dom";
import Message from "./Message";
import ActivitiesContext from "./ActivitiesContext";

export default function ActivitiesDisplay() {

    const [activities, setActivities] = useState();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { sorting } = useContext(ActivitiesContext);
    const activitiesCollectionRef = collection(db, "activities");

    useEffect(()=>{
     
      const getData = async()=>{
        const q = sorting.includes("top") ? 
        query(activitiesCollectionRef, orderBy("points", "desc"), limit(3)) 
        : query(activitiesCollectionRef, orderBy("points"), limit(3));
        try{
          const data = await getDocs(q);
          setActivities(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }catch(e){
          //TODO catch all errors
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
        {activities && activities.map((activity, index) =>{
            return( index < 3 && <ActivityStyled key={activity.id} random={[getRandomInt(-100, 100),getRandomInt(-50, 50),getRandomInt(-30, 30),getRandomInt(-120, 120)]}>
                                        <h2>{activity.name}</h2>
                                </ActivityStyled>)
        })}
      </ActivitiesWrapperStyled>
      <Link to="/activities">see more...</Link>
    </ActivitiesStyled>
  );
}