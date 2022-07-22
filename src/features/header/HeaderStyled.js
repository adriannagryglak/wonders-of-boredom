import styled from "styled-components";
import { shimmer, pulseHeader } from "../../styles/Global"
import { media } from "../../styles/MediaQueries";

export const HeaderStyled = styled.header`
  min-height: 150vh;
  position: relative;
  font-family: var(--cormorant);
  font-size: 1.5rem;
  overflow: hidden;

  p {
    margin-top: 1.2rem;
    text-align: right;
    font-size: 1.2rem;
  }

  ::after {
    position: absolute;
    content: "";
    height: 400px;
    width: 250px;
    background: linear-gradient(red, transparent),
      linear-gradient(to top left, #9aff00, transparent),
      linear-gradient(to top right, blue, transparent);
    background-blend-mode: screen;
    top: -70px;
    right: -40px;
    border-radius: 50%;
    filter: blur(50px);
    transform: rotate(25deg);
    animation: ${pulseHeader} 3s ease 1s infinite alternate;
    position: fixed;
  }
`;


export const HeaderWrapperStyled = styled.div`
  padding: 0 50px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 1;

  ${media.tablet} {
    padding: 0 100px;
  }
  ${media.smallScreen} {
    padding: 0 200px;
    font-size: 1.7rem;
  }
  ${media.largeScreen} {
    padding: 0 400px;
  }
`;

export const ShimmeringArrows = styled.div`
  position: absolute;
  top: 63%;
  left: 50%;
  transform: translateX(-50%);
  height: 25px;
  width: 25px;

  ::after,
  ::before {
    position: absolute;
    content: "";
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    left: 50%;
  }

  ::after {
    width: 50%;
    height: 50%;
    top: -100%;
    transform: translate(-50%, -50%) rotate(45deg);
    animation: ${shimmer} 1s ease-out infinite alternate;
  }

  ::before {
    width: 100%;
    height: 100%;
    top: -60%;
    transform: translate(-50%, -50%) rotate(45deg);
    animation: ${shimmer} 1s ease-in 0.5s infinite alternate;
  }
`;
