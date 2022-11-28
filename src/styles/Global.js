import { createGlobalStyle } from "styled-components";
import { keyframes } from "styled-components";

const GlobalStyles = createGlobalStyle`

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#root, 
#portal{
  background-color: #252523;
  color: #ededed;
  font-family: var(--cormorant);
  overflow: hidden;
  
  ul{
    list-style-type: none;
  }
  
  a{
    display: block;
    font-family: var(--cormorant);
    font-size: 1.5rem;
    cursor: pointer;
    width: 100%;
    text-decoration: none;
    color: inherit;
    transition: all 0.5s ease-in-out;
    z-index: 100;
    position: relative;
  
    :hover {
      font-weight: bold;
    }

    &.link__go-back{
      text-align: right;
      padding-right: 50px;
    }

    &.shining{
      text-shadow: 4px 4px 6px rgba(255, 255, 255, 1);
      font-weight: bold;
    }
  }
}

body::-webkit-scrollbar {
  display: none;
}

.visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.blurred {
  opacity: 0.6;
  filter: blur(5px);
  pointer-events: none;
}

#portal{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background: none;
}

/* VARIABLES */

#root, 
#portal{

    /* fonts */
    --cormorant: 'Cormorant SC', serif;
    --garamond: 'EB Garamond', serif;
    --nanum: 'Nanum Myeongjo', serif;
    --prata: 'Prata', serif;

    /*TODO- colors*/
}

`;

export const shimmer = keyframes`
  from {
    opacity: 0.7;
  }
  to {
    opacity: 0;
  }
`;

export const flicker = keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0.5;
}
`;

export const pulseBlob = keyframes`
  from {
    transform: rotate(25deg) scaleY(1);
    opacity: 1;
  }
  to {
    transform: rotate(0deg) scaleY(0.8);
    opacity: 0.8;
  }
`;

export const pulsePlop = keyframes`
from {
  transform: rotate(225deg) scale(1);
  filter: blur(50px);
}

to {
  transform: rotate(250deg) scale(1.2);
  filter: blur(80px);
}
`;

export default GlobalStyles;
