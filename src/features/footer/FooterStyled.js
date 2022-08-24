import styled from "styled-components";
import { media } from "../../styles/MediaQueries";

export const FooterStyled = styled.footer`
  min-height: 130vh;
  font-family: var(--nanum);
  font-size: 2rem;
  font-weight: 300;
  position: relative;

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

`;

export const FooterWrapperStyled = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
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
