import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectActivitiesState } from "./activitiesSlice";
import {
  ModalStyled,
  HeartIcon,
  FullHeartIcon,
  IconWrapperStyled,
} from "./ModalStyled";
import { updateActivity } from "./activitiesSlice";
import { useDispatch } from "react-redux";

export default function Modal({ id, isOpen }) {
  const { activities } = useSelector(selectActivitiesState);
  const activity = activities.filter((el) => el.id === id)[0];
  const [pointsGiven, setPointsGiven] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOpen && pointsGiven !== 0) {
      dispatch(updateActivity({ id, points: activity.points + pointsGiven }));
      setPointsGiven(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return isOpen
    ? ReactDOM.createPortal(
        <ModalStyled onClick={(e) => e.stopPropagation()}>
          <h1>{activity.name}</h1>
          <p className="modal-author">
            by: {activity.author ? activity.author : "unknown author"}
          </p>
          <IconWrapperStyled tabIndex="0">
            <HeartIcon />
            <FullHeartIcon
              onClick={() => {
                setPointsGiven((prev) => (prev < 3 ? ++prev : 0));
              }}
              style={{
                "--opacity": pointsGiven * 0.33,
              }}
            />
            <span>{pointsGiven !== 0 && "+ " + pointsGiven}</span>
          </IconWrapperStyled>
          <p>points: {activity.points}</p>
          <p className="modal-tags">{activity.tags.map((tag) => tag + " ")}</p>
          <p>
            {activity.solo
              ? "perfect for lone time"
              : activity.outdoor
              ? "outdoorsy"
              : "nothing specific"}
          </p>
        </ModalStyled>,
        document.getElementById("portal")
      )
    : null;
}
