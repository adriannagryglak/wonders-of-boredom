import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ActivitiesStyled,
  ActivitiesWrapperStyled,
  ActivitiesMenusWrapperStyled,
} from "./ActivitiesStyled";
import SortingMenu from "./SortingMenu";
import CategoriesMenu from "./CategoriesMenu";
import TagsMenu from "./TagsMenu";
import Message from "./Message";
import { BlobStyled } from "../../styles/BlobStyled.js";
import { gsap } from "gsap";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";
import { getActivities, selectActivitiesState, setErrors } from "./activitiesSlice";
import { useSearchParams } from "react-router-dom";
import Activity from "./Activity";
import Modal from "./Modal";

export default function Activities() {

  const { activities, loading, errors } = useSelector(selectActivitiesState);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({
    category: "all",
    tags: [],
  });

  const [isOpen, setIsOpen] = useState({
    sorts: false,
    categories: false,
    tags: false,
    modal: false,
  });

  const [modalId, setModalId] = useState(null);
  const categories = ["outdoor", "solo", "all"];
  const tags = ["active", "autumn", "cozy"];
  const plopRef = useRef(null);
  const blobRef = useRef(null);


  useEffect(() => {
    gsap.to([blobRef.current, plopRef.current], {
      duration: 1,
      stagger: 0.8,
      opacity: 1,
      delay: 1,
    });

    dispatch(getActivities);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let currentCategory = searchParams.get("category");
    let currentTags = [
      ...new Set(searchParams.getAll("tags").filter((el) => tags.includes(el))),
    ];
    let currentParams;

    if (currentCategory === "all") {
      currentParams = { tags: currentTags };
    } else if (!categories.includes(currentCategory)) {
      setErrors(`"${currentCategory}" category doesn't exist... yet`);
      currentParams = { tags: currentTags };
    } else {
      setErrors(null);
      currentParams = { category: currentCategory, tags: currentTags };
    }

    setSearchParams(currentParams);
    dispatch(getActivities(currentParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ActivitiesStyled onClick={()=>{setIsOpen({sorts: false, categories: false, tags: false, modal: false,})}}
        blur={Object.values(isOpen).every((el) => !el) ? "0" : "100%"}
      > 
        <BlobStyled ref={blobRef} style={{"--height": "400px", "--width":"250px", "--right":"-10%", "--top": "0"}} />
        <ActivitiesMenusWrapperStyled>
          <CategoriesMenu
            isOpen={isOpen.categories}
            setIsOpen={() => {
              setIsOpen((prev) => ({ ...prev, categories: !prev.categories }));
            }}
          />
          <SortingMenu
            isOpen={isOpen.sorts}
            setIsOpen={() => {
              setIsOpen((prev) => ({ ...prev, sorts: !prev.sorts }));
            }}
          />
          <TagsMenu
            isOpen={isOpen.tags}
            setIsOpen={() => {
              setIsOpen((prev) => ({ ...prev, tags: !prev.tags }));
            }}
          />
        </ActivitiesMenusWrapperStyled>
        <Message errors={errors} loading={loading} />
        <ActivitiesWrapperStyled>
          {activities &&
            activities.map((activity) => {
              return (
                <Activity
                  activity={activity}
                  key={activity.id}
                  openModal={()=>{setIsOpen(prev => ({ ...prev, modal: true}))}}
                  giveId={()=>{setModalId(activity.id)}}
                  active={isOpen.modal && modalId === activity.id}
                />
              );
            })}
        </ActivitiesWrapperStyled>
        <Modal isOpen={isOpen.modal} id={modalId}/>
        <BlobStyled
          ref={plopRef}
          style={{
            "--height":"500px" ,
            "--width": "550px",
            "--top": "80%",
            "--right": "70%",
            opacity: 0
          }}
          plop={true}
        />
        <HashLink  to="/#activities-display" className="link__go-back">
          go back
        </HashLink>
      </ActivitiesStyled>
    </motion.div>
  );
}
