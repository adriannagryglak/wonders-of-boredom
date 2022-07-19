
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlobalStyles from "./styles/Global";
import { HeaderStyled, ShimmeringArrows, HeaderWrapperStyled } from "./styles/HeaderStyled";
import { MainStyled } from "./styles/MainStyled";
import { WrapperStyled } from "./styles/WrapperStyled";
import Activities from './components/Activities';

function App() {

  gsap.registerPlugin(ScrollTrigger);

  const headerRef = useRef(null);
  const shimmerRef = useRef(null);
  const mainRef = useRef(null);


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
  }, []);

  return (
    <>
      <GlobalStyles />
      <HeaderStyled ref={headerRef}>
      <ShimmeringArrows ref={shimmerRef} />
        <HeaderWrapperStyled>
          <blockquote>
            Human beings make life so interesting. Do you know, that in a
            universe so full of wonders, they have managed to invent boredom ?
          </blockquote>
          <p>Terry Pratchett</p>
        </HeaderWrapperStyled>
      </HeaderStyled>

      <Activities/>

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
