import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FooterStyled, FooterWrapperStyled } from "./FooterStyled";
import { BlobStyled } from "../../styles/BlobStyled.js";

export default function Footer() {
  gsap.registerPlugin(ScrollTrigger);
  const footerRef = useRef(null);

  useEffect(() => {
    const footerAppear = gsap.to(footerRef.current.querySelector("p"), {
      opacity: 1,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 20%",
        end: "top -20%",
        scrub: true,
      },
    });

    const stayTuned = gsap.to(footerRef.current.querySelector("span"), {
      opacity: 0,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 20%",
        end: "top -20%",
        scrub: true,
      },
    });

    return () => {
      footerAppear.scrollTrigger.kill();
      stayTuned.scrollTrigger.kill();
    };
  }, []);

  return (
    <FooterStyled ref={footerRef}>
      <FooterWrapperStyled>
        <p>Wonderfull things are coming. Soon...</p>
        <span>stay tuned</span>
      </FooterWrapperStyled>
      <BlobStyled
      style={{
        "--height": "500px",
        "--width": "350px",
        "--bottom": "115px",
        "--left": "-170px",
      }}
      />
    </FooterStyled>
  );
}
