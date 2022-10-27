import { ActivitiesListStyled } from "./ActivitiesStyled";

import { useSearchParams } from "react-router-dom";

export default function TagsMenu({ setIsOpen, isOpen}) {
  const tags = ["active", "autumn", "cozy"];
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTags = searchParams.getAll("tags");

  return (
    <ActivitiesListStyled top={isOpen}>
      <li onClick={e =>{
        e.stopPropagation();
        setIsOpen();
      }}>tags</li>
      <li className={!isOpen ? "closed tags-container" : "tags-container"}>
        {tags.map((tag, i) => {
          return (
            <div
              key={i}
              className={currentTags.includes(tag) ? "active" : ""}
              onClick={() => {
                setSearchParams({
                  category: searchParams.get("category"),
                  tags: currentTags.includes(tag)
                    ? currentTags.filter((el) => tag !== el)
                    : currentTags.concat(tag),
                });
              }}
            >
              {tag}
            </div>
          );
        })}
      </li>
    </ActivitiesListStyled>
  );
}
