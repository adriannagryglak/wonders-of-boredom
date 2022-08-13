import { ActivitiesListStyled } from "./ActivitiesStyled";
import { useState } from "react";

export default function ActivitiesMenu({ action, choice, data, setIsOpen, isOpen }) {
  const [currentChoice, setChoice] = useState(choice);

  return (<ActivitiesListStyled top={isOpen}> 
            <li onClick={setIsOpen}>
              {currentChoice}
            </li>
            {data.map((el, i) => {
              return el !== currentChoice ? (
                <li className={!isOpen ? "closed" : ""} key={i}
                    onClick={() => {
                      setChoice(el);
                      action(el);
                      setIsOpen();
                    }}>{el}</li>
              ) : null;
            })}
          </ActivitiesListStyled>);
}