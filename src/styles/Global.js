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

#root{
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
    transition: font-weight 0.5s ease;
    z-index: 100;
    position: relative;
  
    :hover {
      font-weight: bold;
    }

    &.link__go-back{
      text-align: right;
      padding-right: 50px;
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

/* VARIABLES */

#root{

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