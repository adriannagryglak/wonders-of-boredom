import { ActivitiesListStyled } from "./ActivitiesStyled";
import { useContext } from "react";
import ActivitiesContext from "./ActivitiesContext";
import { useSearchParams } from "react-router-dom";

export default function CategoriesMenu({isOpen, setIsOpen}) {
    const { categories } = useContext(ActivitiesContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentCategory = searchParams.get('category') === null ? "all" : searchParams.get('category');

  return (<ActivitiesListStyled top={isOpen}> 
            <li onClick={setIsOpen}>
              {currentCategory}
            </li>
            {categories.map((el,i) => {
              return el !== currentCategory && (
                <li className={!isOpen ? "closed" : ""} key={i}
                    onClick={() => {
                        setSearchParams({tags: searchParams.getAll('tags'), category: el});
                      setIsOpen();
                    }}>{el}</li>
              );
            })}
          </ActivitiesListStyled>);
} 