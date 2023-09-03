import { createGlobalStyle } from 'styled-components';

const resetCss = `
margin: 0;
padding: 0;
border: 0;
box-sizing: border-box;
`;


const GlobalStyle = createGlobalStyle`
*{
  ${resetCss}
}
body{
  background-color: aqua;
}
`;

export default GlobalStyle;