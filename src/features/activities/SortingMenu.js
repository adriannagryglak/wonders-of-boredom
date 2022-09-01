import { ActivitiesListStyled } from "./ActivitiesStyled";
import ActivitiesContext from "./ActivitiesContext";
import { useContext } from "react";

export default function SortingMenu({isOpen, setIsOpen }) {
  const { sorting, setSorting } = useContext(ActivitiesContext);
  const sorts = ["top rated activities", "least liked activities"];
 
  return (<ActivitiesListStyled top={isOpen}>
            <li onClick={setIsOpen}>
              {sorting}
            </li>
            {sorts.map((el, i) => {
              return el !== sorting ? (
                <li className={!isOpen ? "closed" : ""} key={i}
                    onClick={() => {
                      setSorting(el);
                      setIsOpen();
                    }}>{el}</li>
              ) : null;
            })}
          </ActivitiesListStyled>);
} 