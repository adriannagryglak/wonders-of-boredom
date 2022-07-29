import { ActivitiesListStyled } from "./ActivitiesStyled";
export default function ActivitiesList({ sortType, setSortType, menuOpen, setMenuOpen}) {

  const sortingTypes={top: "top rated activities", 
                      least: "least liked activities",
                      random: "just random ideas"};

  return(<ActivitiesListStyled>
        <li onClick={() => {setMenuOpen((prev) => !prev)}}>
          {sortingTypes[sortType]}
        </li>
        {Object.keys(sortingTypes).map((type, i) => {
          return type !== sortType ? (
            <li className={!menuOpen ? "closed" : ""} key={i}
                onClick={() => {
                  if (type !== sortType) {
                    setSortType(type);
                  }
                  setMenuOpen(false);
                }}>{sortingTypes[type]}</li>
          ) : null;
        })}
      </ActivitiesListStyled>);
}