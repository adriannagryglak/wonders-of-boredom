import { ActivitiesListStyled } from "./ActivitiesStyled";
import { useState, useContext } from "react";
import ActivitiesContext from "./ActivitiesContext";
import { shuffleArray } from "../../utils";

export default function SortingMenu({isOpen, setIsOpen}) {
  const { setActivities } = useContext(ActivitiesContext);
  const sorts = ["top rated activities", "least liked activities", "just random ideas"];
  const [sorting, setSorting] = useState(sorts[0]);

  return (<ActivitiesListStyled top={isOpen}>
            <li onClick={setIsOpen}>
              {sorting}
            </li>
            {sorts.map((el, i) => {
              return el !== sorting ? (
                <li className={!isOpen ? "closed" : ""} key={i}
                    onClick={() => {
                      setSorting(el);
                      setActivities(prev => {
                        return sorting.includes("least") ? prev.sort((a, b) => a.points - b.points) : sorting.includes("top") ? prev.sort((a, b) => a.points - b.points).reverse() : shuffleArray(prev) ;
                      })
                      setIsOpen();
                    }}>{el}</li>
              ) : null;
            })}
          </ActivitiesListStyled>);
}