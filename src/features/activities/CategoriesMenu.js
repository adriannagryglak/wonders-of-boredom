import { ActivitiesListStyled } from "./ActivitiesStyled";
import { useSearchParams } from "react-router-dom";

export default function CategoriesMenu({isOpen, setIsOpen}) {

    const [searchParams, setSearchParams] = useSearchParams();
    const currentCategory = searchParams.get('category') === null ? "all" : searchParams.get('category');
    const categories = ["outdoor", "solo", "all"];
    
  return (<ActivitiesListStyled top={isOpen}> 
            <li onClick={e=>{
              e.stopPropagation();
              setIsOpen();
            }}>
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