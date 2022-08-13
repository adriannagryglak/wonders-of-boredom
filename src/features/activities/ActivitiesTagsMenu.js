import { ActivitiesListStyled } from "./ActivitiesStyled";
import { useState, useEffect, useContext } from "react";
import ActivitiesContext from "./ActivitiesContext";

export default function ActivitiesTagsMenu({ data, setIsOpen, isOpen }) {
    const [tags, setTags] = useState([]);
    const { setFilter } = useContext(ActivitiesContext);

    useEffect(()=>{
        setFilter(prev=> {
            return {
                ...prev, 
                tags: tags,
            }
        }) 
        //eslint-disable-next-line
    }, [tags]);

  return ( <ActivitiesListStyled top={isOpen}>
                <li onClick={setIsOpen}>tags</li>
                <li className={!isOpen ? "closed tags-container" : "tags-container"}>
                    {data.map((el, i) => {
                        return <div key={i} className={tags.includes(el) ? "active": ""} onClick={()=>{
                        setTags(prev=> prev.includes(el) ? prev.filter(tag => tag !== el) : prev.concat(el));
                        }}>{el}</div>
                    })}
                </li>
            </ActivitiesListStyled>);
}