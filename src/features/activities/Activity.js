import { ActivityStyled } from "./ActivityStyled.js";
import { getRandomInt } from "../../utils";

export default function Activities({
  setShine,
  activity,
  openModal,
  active,
  isDisplay,
  giveId,
}) {
  return (
    <ActivityStyled
      isDisplay={isDisplay}
      onClick={(e) => {
        e.stopPropagation();
        if (!isDisplay) {
          openModal();
          giveId();
        } else {
          setShine(true);
          setTimeout(() => {
            setShine(false);
          }, 1000);
        }
      }}
      isActive={active}
      style={{
        "--random1": `${getRandomInt(-100, 100)}px`,
        "--random2": `${getRandomInt(-50, 50)}px`,
        "--random3": `${getRandomInt(-30, 30)}px`,
        "--random4": `${getRandomInt(-120, 120)}px`,
      }}
    >
      <h2>{activity.name}</h2>
    </ActivityStyled>
  );
}
