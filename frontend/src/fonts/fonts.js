import { createGlobalStyle } from 'styled-components';

import BrandonRegularWoff from 'fonts/brandon_reg-webfont.woff'
import BrandonRegularWoff2 from 'fonts/brandon_reg-webfont.woff2'
import BrandonBoldWoff from 'fonts/brandon_bld-webfont.woff'
import BrandonBoldWoff2 from 'fonts/brandon_bld-webfont.woff2'
import BrandonItalicWoff from 'fonts/brandon_reg_it-webfont.woff'
import BrandonItalicWoff2 from 'fonts/brandon_reg_it-webfont.woff2'
import BrandonBoldItalicWoff from 'fonts/brandon_bld_it-webfont.woff'
import BrandonBoldItalicWoff2 from 'fonts/brandon_bld_it-webfont.woff2'

export default createGlobalStyle`
  @font-face {
    font-family: 'BrandonRegular';
    src: local('brandon_grotesque_regularRg'),
      url(${BrandonRegularWoff2}) format('woff2'),
      url(${BrandonRegularWoff}) format('woff');
      font-weight: normal;
      font-style: normal;
  }

  @font-face {
    font-family: 'BrandonBold';
    src: local('brandon_grotesquebold'),
      url(${BrandonBoldWoff2}) format('woff2'),
      url(${BrandonBoldWoff}) format('woff');
      font-weight: normal;
      font-style: normal;
  }

  @font-face {
    font-family: 'BrandonItalic';
    src: local('brandon_grotesqueRgIt'),
      url(${BrandonItalicWoff2}) format('woff2'),
      url(${BrandonItalicWoff}) format('woff');
      font-weight: normal;
      font-style: normal;
  }

  @font-face {
    font-family: 'BrandonBoldItalic';
    src: local('brandon_grotesquebold_italic'),
      url(${BrandonBoldItalicWoff2}) format('woff2'),
      url(${BrandonBoldItalicWoff}) format('woff');
      font-weight: normal;
      font-style: normal;
  } 
`