import { useState, useRef, useEffect} from "react";
import { useSelector, useDispatch  } from 'react-redux';
import { ActivitiesStyled, ActivitiesWrapperStyled, ActivityStyled, ActivitiesMenusWrapperStyled} from "./ActivitiesStyled";
import SortingMenu from "./SortingMenu";
import CategoriesMenu from "./CategoriesMenu"
import TagsMenu from "./TagsMenu";
import { getRandomInt } from "../../utils";
import Message from "./Message";
import { BlobStyled } from "../../styles/BlobStyled.js";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { getActivities, selectActivitiesState, setErrors } from "./activitiesSlice";
import { useSearchParams } from "react-router-dom";
import InteractiveElement from "./InteractiveElement";


export default function Activities() {
  const { activities, loading, errors } = useSelector(selectActivitiesState);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({category: "all", tags: []});
  const [isOpen, setIsOpen] = useState({sorts: false, categories: false, tags: false});

  const categories = ["outdoor", "solo", "all"];
  const tags = ["active", "autumn", "cozy"];
  
  const plopRef = useRef(null);
  const blobRef = useRef(null);

  useEffect(() => {
    gsap.to([blobRef.current, plopRef.current], {
      duration: 1,
      stagger: 0.8,
      opacity: 1,
      delay: 1
    });

    dispatch(getActivities);
  }, [dispatch]);

  useEffect(()=>{
    let currentCategory = searchParams.get('category');
    let currentTags = [...new Set(searchParams.getAll('tags').filter(el => tags.includes(el)))];
    let currentParams;
    
    if(currentCategory === "all"){
      currentParams = {tags: currentTags, };
    }else if(!categories.includes(currentCategory)){
      setErrors(`"${currentCategory}" category doesn't exist... yet`);
      currentParams = {tags: currentTags };
    }else{
      setErrors(null);
      currentParams = {category: currentCategory, tags: currentTags }
    }
    
    setSearchParams(currentParams); 
    dispatch(getActivities(currentParams));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); 

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <InteractiveElement/>
      <ActivitiesStyled blur={Object.values(isOpen).every(el=>!el)} >
        <InteractiveElement>
          <BlobStyled ref={blobRef} height="400px" width="250px" right="-15%"/>
        </InteractiveElement>
        
        <ActivitiesMenusWrapperStyled>
          <CategoriesMenu isOpen={isOpen.categories} setIsOpen={()=>{setIsOpen(prev=>({...prev, categories: !prev.categories}))}}/>
          <SortingMenu isOpen={isOpen.sorts} setIsOpen={()=>{setIsOpen(prev =>({...prev, sorts: !prev.sorts}))}} />
          <TagsMenu isOpen={isOpen.tags} setIsOpen={()=>{setIsOpen(prev=>({...prev, tags: !prev.tags}))}}/>
        </ActivitiesMenusWrapperStyled>
        
        <Message errors={errors} loading={loading}/>
        <ActivitiesWrapperStyled>
          
          {activities && activities.map(activity => {
            return (
                <ActivityStyled key={activity.id} random={[getRandomInt(-100, 100),getRandomInt(-50, 50),getRandomInt(-30, 30),getRandomInt(-120, 120)]}>
                  <h2>{activity.name}</h2>
                </ActivityStyled>) }) }
                
        </ActivitiesWrapperStyled>
        <BlobStyled ref={plopRef} height="500px" width="550px" top="80%" right="70%" plop={true} style={{opacity: 0}}/>
        <Link to="/" style={{marginLeft: "50%"}}>go back</Link>
      </ActivitiesStyled>
    </motion.div>
  );
}