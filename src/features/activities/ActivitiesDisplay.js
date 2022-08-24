import ActivitiesContext from "./ActivitiesContext";
import { useContext, useState, useEffect } from "react";
import { ActivitiesStyled, ActivitiesWrapperStyled, ActivitiesMenusWrapperStyled, ActivityStyled } from "./ActivitiesStyled";
import SortingMenu from "./SortingMenu";
import { getRandomInt } from "../../utils";
import { gsap, } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Message from "./Message";

export default function ActivitiesDisplay() {
    gsap.registerPlugin(ScrollTrigger);
    const { activities, filter, setFilter } = useContext(ActivitiesContext);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
     if(filter.category !== "all" || filter.tags.length > 0){
        setFilter({category: "all", tags: []});
     }   
    });

  return (
    <ActivitiesStyled blur={!isOpen} isDisplay={true}>
      <ActivitiesMenusWrapperStyled>
        <SortingMenu isOpen={isOpen} setIsOpen={()=>{setIsOpen(prev => !prev)}}/>
      </ActivitiesMenusWrapperStyled>
      <Message />
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