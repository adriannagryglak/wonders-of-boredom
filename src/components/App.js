import GlobalStyles from "../styles/Global";
import Header from "../features/header/Header";
import Footer from '../features/footer/Footer';
import { ActivitiesContextProvider } from "../features/activities/ActivitiesContext";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <GlobalStyles />
      <Header />
      <main>
      <ActivitiesContextProvider>
          {/* TODO <CustomActivitySearch /> */}
          <Outlet/>
          {/* TODO <Share your own idea /> */}
          </ActivitiesContextProvider>
      </main>
      <Footer/>
    </>
  );
}

export default App;
 