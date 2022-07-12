import styled from "styled-components";
import { media } from "./MediaQueries";
import { keyframes } from "styled-components";

const pulse = keyframes`
from {
  transform: rotate(225deg) scale(1);
  filter: blur(50px);
}

to {
  transform: rotate(250deg) scale(1.2);
  filter: blur(80px);
}
`;

export const MainStyled = styled.main`
  min-height: 130vh;
  font-family: var(--nanum);
  font-size: 2rem;
  font-weight: 300;
  position: relative;

  div {
    position: unset;
  }

  p {
    position: absolute;
    margin: 0 50px;
    opacity: 0;
    font-size: 1.7rem;

    ${media.tablet} {
      font-size: 2rem;
      margin: 0 100px;
    }
  }

  span {
    font-size: 4rem;
    font-family: var(--cormorant);
  }

  ::after {
    position: absolute;
    content: "";
    height: 300px;
    width: 350px;
    background: linear-gradient(red, transparent),
      linear-gradient(to top left, #9aff00, transparent),
      linear-gradient(to top right, blue, transparent);
    background-blend-mode: screen;
    bottom: 115px;
    left: -170px;
    border-radius: 50%;
    transform: rotate(225deg);
    animation: ${pulse} 3s ease-in-out infinite alternate;
  }
`;
