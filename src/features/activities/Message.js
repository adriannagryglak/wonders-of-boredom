import ActivitiesContext from "./ActivitiesContext";
import { useContext } from "react";

export default function Message() {
  const { loading, errors } = useContext(ActivitiesContext);

  return (
    <>
      {errors && <p>Sorry, we've got an issue "{errors}"</p>}
      {loading && <p>Loading, please wait...</p>}
    </>
  );
}
