import Header from "../features/header/Header";
import Footer from '../features/footer/Footer';
import ActivitiesDisplay from '../features/activities/ActivitiesDisplay';

function App() {

  return (
    <>
      <Header />
      <main>
        <ActivitiesDisplay/>
      </main>
      <Footer/>
    </>
  );
}

export default App;
 