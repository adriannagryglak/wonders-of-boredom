import styled from "styled-components";
import { media } from "./MediaQueries";

export const WrapperStyled = styled.div`
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
