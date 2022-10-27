import { ActivitiesListStyled } from "./ActivitiesStyled";
import { useSelector, useDispatch  } from 'react-redux';
import { sortActivities, chooseSorting, selectActivitiesState } from "./activitiesSlice";

export default function SortingMenu({isOpen, setIsOpen }) {

  const { sorting } = useSelector(selectActivitiesState);
  const dispatch = useDispatch();
  const sorts = ["top rated activities", "least liked activities", "some random ideas"];
 
  return (<ActivitiesListStyled top={isOpen}>
            <li onClick={e => {
              e.stopPropagation(); 
              setIsOpen();}}>
              {sorting}
            </li>
            {sorts.map((el, i) => {
              return el !== sorting ? (
                <li className={!isOpen ? "closed" : ""} key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(chooseSorting(el));
                      setIsOpen();
                      dispatch(sortActivities(el));
                    }}>{el}</li>
              ) : null;
            })}
          </ActivitiesListStyled>);
} 