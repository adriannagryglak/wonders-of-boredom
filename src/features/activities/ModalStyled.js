import styled from "styled-components/macro";
import { SuitHeartFill } from "@styled-icons/bootstrap/SuitHeartFill";
import { SuitHeart } from "@styled-icons/bootstrap/SuitHeart";
import { media } from "../../styles/MediaQueries";

export const ModalStyled = styled.div`
  width: 70vw;
  font-size: 24px;
  font-family: var(--nanum);
  font-weight: bold;
  text-align: center;

  ${media.smallScreen} {
    width: 50vw;
  }

  h1 {
    font-size: 34px;
  }

  p {
    padding: 7px 0;
    position: relative;
  }

  .modal-tags {
    font-family: var(--cormorant);
  }

  .modal-author {
    font-size: 18px;
    padding: 10px 0;
  }
`;

export const IconWrapperStyled = styled.div`
  position: relative;
  height: 30px;
  width: 30px;
  margin: 20px auto;

  span {
    position: absolute;
    top: 65%;
    right: -90%;
    font-size: 16px;
    transform: rotate(5deg);
    opacity: 0;
  }
`;

export const FullHeartIcon = styled(SuitHeartFill)`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  fill: rgb(237, 237, 237);
  transition: all 0.4s ease;
  opacity: var(--opacity);
  cursor: pointer;
`;

export const HeartIcon = styled(SuitHeart)`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;
