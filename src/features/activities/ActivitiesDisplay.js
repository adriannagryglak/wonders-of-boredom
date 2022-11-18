import { db } from "../../firebase-config";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  ActivitiesStyled,
  ActivitiesWrapperStyled,
  ActivitiesMenusWrapperStyled,
} from "./ActivitiesStyled";
import SortingMenu from "./SortingMenu";
import { Link } from "react-router-dom";
import Message from "./Message";
import Activity from "./Activity";
import { useSelector, useDispatch } from "react-redux";
import { selectActivitiesState, getActivities } from "./activitiesSlice";

export default function ActivitiesDisplay() {
  const { sorting, activities, loading, errors } = useSelector(
    selectActivitiesState
  );
  const [threeActivities, setThreeActivities] = useState([]);
  const [threeErrors, setThreeErrors] = useState(null);
  const [threeLoading, setThreeLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shine, setShine] = useState(false);

  const activitiesCollectionRef = collection(db, "activities");
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      let q;
      if (sorting.includes("top")) {
        q = query(activitiesCollectionRef, orderBy("points", "desc"), limit(3));
      } else if (sorting.includes("least")) {
        q = query(activitiesCollectionRef, orderBy("points"), limit(3));
      }
      try {
        const data = await getDocs(q);
        setThreeErrors(null);
        setThreeActivities(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (e) {
        setThreeErrors(e.message);
      } finally {
        setThreeLoading(false);
      }
    };

    if (sorting.includes("random")) {
      dispatch(getActivities({ category: null, tags: [] }));
    } else {
      getData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  useEffect(() => {
    if (activities.length > 0 && sorting.includes("random")) {
      let indexes = [];
      while (indexes.length < 3) {
        let index = Math.floor(Math.random() * activities.length);
        indexes.push(index);
        indexes = [...new Set(indexes)];
      }

      let randomActivities = [];
      if (randomActivities.length === 3) {
        randomActivities.forEach((el) => {
          randomActivities.push(activities[el]);
        });
      }
      setThreeActivities(randomActivities);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities]);

  useEffect(() => {
    setThreeLoading(loading);
    setThreeErrors(errors);
  }, [loading, errors]);

  return (
    <ActivitiesStyled
      blur={isMenuOpen ? "100%" : "0"}
      isDisplay={true}
      id="activities-display"
    >
      <ActivitiesMenusWrapperStyled>
        <SortingMenu
          isOpen={isMenuOpen}
          setIsOpen={() => {
            setIsMenuOpen((prev) => !prev);
          }}
        />
      </ActivitiesMenusWrapperStyled>
      <Message errors={threeErrors} loading={threeLoading} />
      <ActivitiesWrapperStyled>
        {threeActivities &&
          threeActivities.map((activity) => {
            return (
              <Activity
                setShine={setShine}
                activity={activity}
                key={activity.id}
                isDisplay
              />
            );
          })}
      </ActivitiesWrapperStyled>
      <Link className={shine ? "shining" : ""} to="/activities">
        see more...
      </Link>
    </ActivitiesStyled>
  );
}
