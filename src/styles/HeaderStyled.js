import styled from "styled-components";
import { keyframes } from "styled-components";

const shimmer = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 0.7;
  }
`;

const pulse = keyframes`
  from {
    transform: rotate(25deg) scaleY(1);
    opacity: 1;
  }

  to {
    transform: rotate(0deg) scaleY(0.8);
    opacity: 0.8;
  }
`;

export const HeaderStyled = styled.header`
  min-height: 150vh;
  position: relative;
  font-family: var(--cormorant);
  font-size: 1.5rem;
  overflow: hidden;

  span {
    margin: 1.5rem 0 0 auto;
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
    animation: ${pulse} 3s ease 1s infinite alternate;
    position: fixed;
  }
`;

export const ShimmeringArrows = styled.div`
  position: absolute;
  bottom: 0;
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
