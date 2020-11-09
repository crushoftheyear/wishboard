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

  a {
    text-decoration: none;
    color: inherit;
  }
  
  h1,
  h2,
  h3,
  h4 {
    margin: 0;
    @extend .first-letter-uppercase;
  }
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    font-family: 'BrandonBold';
  }
  
  h2 {
    font-family: 'BrandonBold';
  }
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 0;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
`;

export default GlobalStyle;
