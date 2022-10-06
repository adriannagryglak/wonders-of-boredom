import { Link } from "react-router-dom";
import { CreateActivityLinkWrapperStyled } from './CreateActivityStyled';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useMediaPredicate } from "react-media-hook";
import InteractiveElement from "../../components/InteractiveElement";
import { BlobStyled } from "../../styles/BlobStyled";

export default function CreateActivityDisplay() {

    gsap.registerPlugin(ScrollTrigger);
    const linkWrapperRef = useRef(null);

    let scrollStart = useMediaPredicate('(min-width: 30rem)') ? "-50% 50%" : "-10% 50%";
 
    useEffect(() => {
        const linkSlide = gsap.to(linkWrapperRef.current, {
          translateX: 0,
          scrollTrigger: {
            trigger: linkWrapperRef.current,
            start: scrollStart,
            end: "50% 50%",
            scrub: true,
            
          },
        });
    
        return () => {
          linkSlide.scrollTrigger.kill();
        };

      }, [scrollStart]);
  return (
    <CreateActivityLinkWrapperStyled ref={linkWrapperRef}>
        <p>Feel free to share your personal best ideas on how to fight boredom, maybe you'll inspire someone too.</p>
        <Link to="/create-wonders">create wonders</Link>
        <InteractiveElement>
            <BlobStyled height="100px" width="150px" rotate="45deg" right="15%"/>
        </InteractiveElement>
    </CreateActivityLinkWrapperStyled>
  );
}
