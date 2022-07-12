import { db } from "../src/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

function App() {
  const [activities, setActivities] = useState([]);
  const activitiesCollectionRef = collection(db, "activities");

  useEffect(() => {
    const getActivities = async () => {
      const data = await getDocs(activitiesCollectionRef);

      setActivities(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getActivities();
  }, []);

  console.log(activities);
  return (
    <div className="App">
      <header>
        <h1>well, hello there.</h1>
      </header>
      <blockquote>
        Human beings make life so interesting. Do you know, that in a universe
        so full of wonders, they have managed to invent boredom ?
      </blockquote>
      <span>
        -DEATH
        <br />
      </span>
      <span>Terry Pratchett</span>
    </div>
  );
}

export default App;
