import styled from "styled-components/macro";
import { pulseBlob, pulsePlop } from "./Global";

export const BlobStyled = styled.div`
  overflow: hidden;

  ::after {
    content: "";
    filter: blur(50px);
    height: var(--height);
    width: var(--width);
    background: linear-gradient(red, transparent),
      linear-gradient(to top left, #9aff00, transparent),
      linear-gradient(to top right, blue, transparent);
    background-blend-mode: screen;
    top: var(--top);
    right: var(--right);
    left: var(--left);
    bottom: var(--bottom);
    border-radius: 50%;
    filter: blur(50px);
    transform: rotate(var(--rotate));
    animation: ${({ plop }) => (plop ? pulsePlop : pulseBlob)} 3s linear 1s infinite alternate;
    position: var(--fixed, absolute);
  }
`;
