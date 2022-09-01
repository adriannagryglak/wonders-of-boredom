import Header from "../features/header/Header";
import Footer from "../features/footer/Footer";
import ActivitiesDisplay from "../features/activities/ActivitiesDisplay";
import { motion } from "framer-motion";

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
      </main>
      <Footer />
    </motion.div>
  );
}

export default App;
