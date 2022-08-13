import { useEffect, useRef, useContext, useState } from "react";
import { ActivitiesStyled, ActivitiesWrapperStyled, ActivityStyled, ActivitiesMenusWrapperStyled} from "./ActivitiesStyled";
import { gsap, } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import ActivitiesContext from "./ActivitiesContext";
import ActivitiesMenu from "./ActivitiesMenu";
import ActivitiesTagsMenu from "./ActivitiesTagsMenu";
import { getRandomInt, shuffleArray } from "../../utils";

export default function Activities({ display }) {
  gsap.registerPlugin(ScrollTrigger);
  const activitiesRef = useRef(null);

  const { activities, loading, errors, setFilter } = useContext(ActivitiesContext);

  const sorts = ["top rated activities", "least liked activities", "just random ideas"];
  const categories = ["outdoor", "solo", "all"];
  const tags = ["active", "autumn", "cozy"];

  const [sort, setSort] = useState(sorts[0]);
  const [isOpen, setIsOpen] = useState({sorts: false, categories: false, tags: false});

  function handleCategoryChange(el){
    setFilter(prev=> ({...prev, category: el}));
  }

  useEffect(() => {
    const activitiesAppear = gsap.to(activitiesRef.current, {
      opacity: 1,
      scrollTrigger: {
        trigger: activitiesRef.current,
        start: "top 60%",
        end: "top 20%",
      },
    });
    return () => {
      activitiesAppear.scrollTrigger.kill();
    };
  });

    const sortedActivities = activities && sorts.indexOf(sort) === 0 ? activities.sort((a, b) => a.points - b.points) 
    : activities && sorts.indexOf(sort) === 1 ? activities.sort((a, b) => a.points - b.points).reverse()
    : activities && shuffleArray(activities);
    
  return (
    <ActivitiesStyled ref={activitiesRef} blur={Object.values(isOpen).every(el=>!el)}>
      <ActivitiesMenusWrapperStyled>
        { display && <ActivitiesMenu data={sorts} action={(el)=>{setSort(el)}} choice={sorts[0]} isOpen={isOpen.sorts} setIsOpen={()=>{setIsOpen(prev =>({...prev, sorts: !prev.sorts}))}}/>}
        { !display && <>
                        <ActivitiesMenu  data={categories} action={handleCategoryChange} choice={categories[2]} isOpen={isOpen.categories} setIsOpen={()=>{setIsOpen(prev=>({...prev, categories: !prev.categories}))}}/>
                        <ActivitiesMenu data={sorts} action={(el)=>{setSort(el)}} choice={sorts[0]} isOpen={isOpen.sorts} setIsOpen={()=>{setIsOpen(prev =>({...prev, sorts: !prev.sorts}))}}/>
                        <ActivitiesTagsMenu data={tags} isOpen={isOpen.tags} setIsOpen={()=>{setIsOpen(prev=>({...prev, tags: !prev.tags}))}}/>
                      </>}
      </ActivitiesMenusWrapperStyled>
      { errors && <p>Sorry, we've got an issue "{errors}"</p>}
      { loading && <p>Loading, please wait...</p>}
      <ActivitiesWrapperStyled>
        { activities ? sortedActivities.map((activity, index) => {
          return !display ? 
            <ActivityStyled key={activity.id} random={[getRandomInt(-100, 100),getRandomInt(-50, 50),getRandomInt(-30, 30),getRandomInt(-120, 120)]}>
              <h2>{activity.name}</h2>
            </ActivityStyled> : 
            (index < 3 && 
              <ActivityStyled key={activity.id} random={[getRandomInt(-100, 100),getRandomInt(-50, 50),getRandomInt(-30, 30),getRandomInt(-120, 120)]}>
                <h2>{activity.name}</h2>
              </ActivityStyled>);
            }) : !loading && <p>sorry, seems that we dont have anything yet </p>}
        {display && <Link to="/all">see more...</Link>}
      </ActivitiesWrapperStyled>
    </ActivitiesStyled>
  );
}