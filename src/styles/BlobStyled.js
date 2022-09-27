import styled from "styled-components";
import { pulseBlob, pulsePlop } from "./Global";

export const BlobStyled = styled.div`
  overflow: hidden;

  ::after {
    content: "";
    filter: blur(50px);
    height: ${(props) => props.height};
    width: ${(props) => props.width};
    background: linear-gradient(red, transparent),
      linear-gradient(to top left, #9aff00, transparent),
      linear-gradient(to top right, blue, transparent);
    background-blend-mode: screen;
    top: ${(props) => props.top};
    right: ${(props) => props.right};
    left: ${(props) => props.left};
    bottom: ${(props) => props.bottom};
    border-radius: 50%;
    filter: blur(50px);
    transform: rotate(${(props) => props.rotate});
    animation: ${({ plop }) => (plop ? pulsePlop : pulseBlob)} 3s linear 1s
     infinite alternate;
    position: ${({ fixed }) => (fixed ? "fixed" : "absolute")};
   
  }
`;
