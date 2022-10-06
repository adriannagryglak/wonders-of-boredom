import Header from "../features/header/Header";
import Footer from "../features/footer/Footer";
import ActivitiesDisplay from "../features/activities/ActivitiesDisplay";
import { motion } from "framer-motion";
import CreateActivityDisplay from "../features/create-activity/CreateActivityDisplay";


function App() {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <main>
        <ActivitiesDisplay />
        <CreateActivityDisplay />
      </main>
      <Footer />
    </motion.div>
  );
}

export default App;
