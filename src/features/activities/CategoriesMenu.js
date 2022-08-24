import { ActivitiesListStyled } from "./ActivitiesStyled";
import { useContext } from "react";
import ActivitiesContext from "./ActivitiesContext";

export default function CategoriesMenu({isOpen, setIsOpen}) {
    const { filter, setFilter } = useContext(ActivitiesContext);
    const categories = ["outdoor", "solo", "all"];

  return (<ActivitiesListStyled top={isOpen}> 
            <li onClick={setIsOpen}>
              {filter.category}
            </li>
            {categories.map((el, i) => {
              return el !== filter.category ? (
                <li className={!isOpen ? "closed" : ""} key={i}
                    onClick={() => {
                      setFilter(prev=> ({...prev, category: el}));
                      setIsOpen();
                    }}>{el}</li>
              ) : null;
            })}
          </ActivitiesListStyled>);
} 