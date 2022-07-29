import { useState, useEffect, useRef, useContext } from "react";
import { ActivitiesStyled, ActivitiesWrapperStyled, ActivityStyled } from "./ActivitiesStyled";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import ActivitiesContext from "./ActivitiesContext";
import ActivitiesMenu from "./ActivitiesMenu";
import ActivitiesForm from "./ActivitiesForm";
import { getRandomInt, shuffleArray } from "../../utils";

export default function Activities({ display }) {

  gsap.registerPlugin(ScrollTrigger);
  const activitiesRef = useRef(null);
  const { activities, loading, errors, filterActivities } = useContext(ActivitiesContext);
  const [sortType, setSortType] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState({category: "", tags: []});
  
  function handleCategoryChange(event){
    setFilter(prev=> {
        return {
            ...prev, 
            // WHY NOT WOKRING category: prev.category == event.target.value ? null : event.target.value
            category: event.target.value,
        }
    }) 
}

function handleTagChange(event){
    setFilter(prev=>{
        const currentTags= prev.tags.includes(event.target.name) ? prev.tags.filter(tag=> tag!== event.target.name) : prev.tags.concat(event.target.name);
        return{
            ...prev, 
            tags: currentTags,
        }
    }); 
}

useEffect(()=>{
    filterActivities(filter);
    //eslint-disable-next-line
}, [filter]);

  useEffect(() => {
  const activitiesAppear = gsap.to(activitiesRef.current, {
    opacity: 1,
    scrollTrigger: {
      trigger: activitiesRef.current,
      start: "top 60%",
      end: "top 20%",
      scrub: true,
    },
  });
  return () => {
    activitiesAppear.scrollTrigger.kill();
  };
});

  let sortedActivities
  if(activities){
    sortedActivities =
    sortType === "top"
      ? activities.sort((a, b) => a.points - b.points)
      : sortType === "least"
      ? activities.sort((a, b) => a.points - b.points).reverse()
      : shuffleArray(activities);
  }

  return (
    <ActivitiesStyled ref={activitiesRef}>
      <ActivitiesMenu setSortType={setSortType} sortType={sortType} setMenuOpen={setMenuOpen} menuOpen={menuOpen}/>
      {!display && <ActivitiesForm filter={filter} handleCategoryChange={handleCategoryChange} handleTagChange={handleTagChange}/>}
      { errors && <p>Sorry, we've got an issue "{errors}"</p>}
      { loading && <p>Loading, please wait...</p>}
      <ActivitiesWrapperStyled menuOpen={menuOpen}>
        { sortedActivities && sortedActivities.map((activity, index) => {
          return !display ? 
            <ActivityStyled key={activity.id} random={[getRandomInt(-100, 100),getRandomInt(-50, 50),getRandomInt(-30, 30),getRandomInt(-120, 120)]}>
              <h2>{activity.name}</h2>
            </ActivityStyled> : 
            (index < 3 && 
              <ActivityStyled key={activity.id} random={[getRandomInt(-100, 100),getRandomInt(-50, 50),getRandomInt(-30, 30),getRandomInt(-120, 120)]}>
                <h2>{activity.name}</h2>
              </ActivityStyled>);
            })}
        {display && <Link to="/all">see more...</Link>}
      </ActivitiesWrapperStyled>
    </ActivitiesStyled>
  );
}