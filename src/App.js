import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlobalStyles from "./styles/Global";
import { HeaderStyled, ShimmeringArrows } from "./styles/HeaderStyled";
import { MainStyled } from "./styles/MainStyled";
import { WrapperStyled } from "./styles/WrapperStyled";

function App() {
  const [activities, setActivities] = useState([]);
  const activitiesCollectionRef = collection(db, "activities");
  gsap.registerPlugin(ScrollTrigger);

  const headerRef = useRef(null);
  const shimmerRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const getActivities = async () => {
      const data = await getDocs(activitiesCollectionRef);
      setActivities(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const arrowDisappear = gsap.to(shimmerRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top",
        end: "3%",
        scrub: true,
      },
    });

    const quoteDisappear = gsap.to(headerRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top",
        end: "60%",
        scrub: true,
      },
    });

    const mainAppear = gsap.to(mainRef.current.querySelector("p"), {
      opacity: 1,
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top 20%",
        end: "top -20%",
        scrub: true,
      },
    });

    const stayTuned = gsap.to(mainRef.current.querySelector("span"), {
      opacity: 0,
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top 20%",
        end: "top -20%",
        scrub: true,
      },
    });

    return () => {
      arrowDisappear.scrollTrigger.kill();
      quoteDisappear.scrollTrigger.kill();
      mainAppear.scrollTrigger.kill();
      stayTuned.scrollTrigger.kill();
    };
  });

  console.log(activities);
  return (
    <>
      <GlobalStyles />
      <HeaderStyled ref={headerRef}>
        <WrapperStyled>
          <blockquote>
            Human beings make life so interesting. Do you know, that in a
            universe so full of wonders, they have managed to invent boredom ?
          </blockquote>
          <span>Terry Pratchett</span>
          <ShimmeringArrows ref={shimmerRef} />
        </WrapperStyled>
      </HeaderStyled>
      <MainStyled ref={mainRef}>
        <WrapperStyled>
          <p>Wonderfull things are coming. Soon...</p>
          <span>stay tuned</span>
        </WrapperStyled>
      </MainStyled>
    </>
  );
}

export default App;
