import { createGlobalStyle } from "styled-components";

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

/* VARIABLES */

#root{
    /* fonts */
    --cormorant: 'Cormorant SC', serif;
    --garamond: 'EB Garamond', serif;
    --nanum: 'Nanum Myeongjo', serif;
    --prata: 'Prata', serif;
}

`;
export default GlobalStyles;
