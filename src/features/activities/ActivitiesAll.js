import { useContext } from "react";
import { getRandomInt } from "../../utils";
import { ActivitiesContext } from "./ActivitiesContext";
import { ActivitiesStyled, ActivitiesWrapperStyled, ActivityStyled } from "./ActivitiesStyled";

export default function ActivitiesAll() {
    const { activities } = useContext(ActivitiesContext);
    console.log(activities);
    return (
    <ActivitiesStyled style={{opacity: 1}}>
        <h1>All activitities will be here. With sorting ability, comments, good stuff.</h1>
        <ActivitiesWrapperStyled>
            {activities && activities.map((activity)=>{
                return <ActivityStyled key={activity.id} random={[getRandomInt(-100, 100),getRandomInt(-50, 50),getRandomInt(-30, 30),getRandomInt(-120, 120)]}>
                <h2>{activity.name}</h2>
                </ActivityStyled>
            })}
        </ActivitiesWrapperStyled>
    </ActivitiesStyled>);
}