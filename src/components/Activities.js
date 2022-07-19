import { useState, useEffect, useRef } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { ActivitiesStyled, ActivitiesWrapper, ActivitiesListStyled, ActivityStyled } from "../styles/ActivitiesStyled";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Activities() {
  const activitiesCollectionRef = collection(db, "activities");
  gsap.registerPlugin(ScrollTrigger);
  const activitiesRef = useRef(null);
  const sortingTypes = [
    "Top ranked activities",
    "Least rated activities",
    "Random activities ideas",
  ];

  const [sort, setSort] = useState(sortingTypes[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      const data = await getDocs(activitiesCollectionRef);
      setActivities(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  
  let sortedActivities =
    sortingTypes.indexOf(sort) === 0
      ? activities.sort((a, b) => a.points - b.points)
      : sortingTypes.indexOf(sort) === 1
      ? activities.sort((a, b) => a.points - b.points).reverse()
      : shuffleArray(activities);
  
  return (
    <ActivitiesStyled ref={activitiesRef}>
      <ActivitiesListStyled>
        <li
          onClick={() => {
            setMenuOpen((prev) => !prev);
          }}
        >
          {sort}
        </li>
        {sortingTypes.map((type, i) => {
          return type !== sort ? (
            <li
              className={!menuOpen ? "closed" : ""}
              key={type}
              onClick={() => {
                if (type !== sortingTypes.indexOf(2)) {
                  setSort(type);
                }
                setMenuOpen(false);
              }}
            >
              {type}
            </li>
          ) : null;
        })}
      </ActivitiesListStyled>
      <ActivitiesWrapper menuOpen={menuOpen}>
        {sortedActivities.map((activity, index) => {
          return (
            index < 3 && (
              <ActivityStyled key={activity.id} random={[getRandomInt(-100, 100),getRandomInt(-50, 50),getRandomInt(-30, 30),getRandomInt(-120, 120)]}>
                <h2>{activity.name}</h2>
              </ActivityStyled>
            )
          );
        })}
        <p>see more...</p>
      </ActivitiesWrapper>
    </ActivitiesStyled>
  );
}

//helpers
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
