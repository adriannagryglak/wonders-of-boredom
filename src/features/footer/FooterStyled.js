import styled from "styled-components";
import { media } from "../../styles/MediaQueries";
import { pulseMain } from "../../styles/Global";

export const FooterStyled = styled.footer`
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
    animation: ${pulseMain} 3s ease-in-out infinite alternate;
  }
`;

export const FooterWrapperStyled = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  position: fixed;
  z-index: 10;

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
