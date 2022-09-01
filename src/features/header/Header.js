import { HeaderStyled, ShimmeringArrows, HeaderWrapperStyled } from "./HeaderStyled";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlobStyled } from "../../styles/BlobStyled";

export default function Headers(){
    gsap.registerPlugin(ScrollTrigger);
    const headerRef = useRef(null);
    const shimmerRef = useRef(null);

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

        return () => {
          arrowDisappear.scrollTrigger.kill();
          quoteDisappear.scrollTrigger.kill();
        };

      });
      
 return (
    <HeaderStyled ref={headerRef}>
        <BlobStyled height="400px" width="250px" rotate="25deg" top="-70px" right="-40px" fixed={true}/>
        <ShimmeringArrows ref={shimmerRef} />
        <HeaderWrapperStyled>
          <blockquote>
            Human beings make life so interesting. Do you know, that in a
            universe so full of wonders, they have managed to invent boredom ?
          </blockquote>
          <p>Terry Pratchett</p>
        </HeaderWrapperStyled>
      </HeaderStyled>
 );
}