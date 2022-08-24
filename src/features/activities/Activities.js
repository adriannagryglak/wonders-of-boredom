import { useContext, useState, useRef, useEffect } from "react";
import { ActivitiesStyled, ActivitiesWrapperStyled, ActivityStyled, ActivitiesMenusWrapperStyled} from "./ActivitiesStyled";
import ActivitiesContext from "./ActivitiesContext";
import SortingMenu from "./SortingMenu";
import CategoriesMenu from "./CategoriesMenu"
import TagsMenu from "./TagsMenu";
import { getRandomInt } from "../../utils";
import Message from "./Message";
import { BlobStyled } from "../../styles/BlobStyled.js";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

export default function Activities() {

  const { activities } = useContext(ActivitiesContext);
  const [isOpen, setIsOpen] = useState({sorts: false, categories: false, tags: false});

  const activitiesRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);

  useEffect(() => {
    let blobsAppear = gsap.to([blob1Ref.current, blob2Ref.current], 1.5, {
      opacity: 1,
      stagger: 0.8,
      immediateRender: false
    });
    return () => {
      blobsAppear.kill();
    };
  });

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <ActivitiesStyled ref={activitiesRef} blur={Object.values(isOpen).every(el=>!el)} >

        <BlobStyled ref={blob1Ref} height="400px" width="250px" top="-10%" right="10%" plop={true} style={{opacity: 0}}/>
        <ActivitiesMenusWrapperStyled>
          <CategoriesMenu isOpen={isOpen.categories} setIsOpen={()=>{setIsOpen(prev=>({...prev, categories: !prev.categories}))}}/>
          <SortingMenu isOpen={isOpen.sorts} setIsOpen={()=>{setIsOpen(prev =>({...prev, sorts: !prev.sorts}))}}/>
          <TagsMenu isOpen={isOpen.tags} setIsOpen={()=>{setIsOpen(prev=>({...prev, tags: !prev.tags}))}}/>
        </ActivitiesMenusWrapperStyled>
        <Message/>
        <ActivitiesWrapperStyled>
          { activities && activities.map((activity, index) => {
            return (
                <ActivityStyled key={activity.id} random={[getRandomInt(-100, 100),getRandomInt(-50, 50),getRandomInt(-30, 30),getRandomInt(-120, 120)]}>
                  <h2>{activity.name}</h2>
                </ActivityStyled>) }) }
        </ActivitiesWrapperStyled>
        <BlobStyled ref={blob2Ref} height="500px" width="550px" top="80%" right="70%" plop={true} style={{opacity: 0}}/>
        <Link to="/" style={{marginLeft: "50%"}}>go back</Link>

      </ActivitiesStyled>
    </motion.div>
  );
}