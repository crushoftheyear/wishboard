import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

html, body, #root {
  height: 100%;
}

body {
  margin: 0;
  background-color: #f5f5f5;
  color:  #383e4e;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.3;
  font-family: 'BrandonRegular', 'Avenir', 'Helvetica', 'sans-serif';
  -webkit-font-smoothing: antialiased;

  ::selection {
    background-color: #50aca2;
  }
}
`;

export default GlobalStyle;
